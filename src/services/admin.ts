import { initializeApp, type FirebaseApp } from 'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type Auth,
} from 'firebase/auth'

export type AdminUser = {
  email: string
  role: 'admin'
}

export type SheetTable = {
  columns: string[]
  rows: string[][]
  updatedAt: string
}

let app: FirebaseApp | undefined
let auth: Auth | undefined

function initializeFirebase() {
  if (app && auth) return { auth }
  const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  }
  if (Object.values(config).some((value) => !value)) {
    throw new Error('Firebase ще не налаштовано. Додайте VITE_FIREBASE_* у файл .env.')
  }
  app = initializeApp(config)
  auth = getAuth(app)
  return { auth }
}

async function currentAdmin(): Promise<AdminUser> {
  const { auth } = initializeFirebase()
  const firebaseUser = await new Promise<typeof auth.currentUser>((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    })
  })
  if (!firebaseUser) throw new Error('Потрібна авторизація адміністратора.')
  const email = firebaseUser.email?.toLowerCase() || ''
  const adminEmails = String(import.meta.env.VITE_FIREBASE_ADMIN_EMAILS || '')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean)
  if (!adminEmails.includes(email)) throw new Error('У цього акаунта немає прав адміністратора.')
  return { email, role: 'admin' }
}

export async function getAdminSession(): Promise<{ user: AdminUser }> {
  return { user: await currentAdmin() }
}

export async function loginAdmin(email: string, password: string): Promise<{ user: AdminUser }> {
  const { auth } = initializeFirebase()
  try {
    await signInWithEmailAndPassword(auth, email, password)
    return { user: await currentAdmin() }
  } catch (reason) {
    await signOut(auth).catch(() => undefined)
    if (reason instanceof Error && reason.message.includes('прав адміністратора')) throw reason
    throw new Error('Неправильний email або пароль.')
  }
}

export async function logoutAdmin(): Promise<void> {
  const { auth } = initializeFirebase()
  await signOut(auth)
}

export async function getAdminUsers(): Promise<SheetTable> {
  await currentAdmin()
  const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID
  const sheetName = import.meta.env.VITE_GOOGLE_SHEET_NAME || 'students_data'
  if (!sheetId) throw new Error('Google-таблицю ще не налаштовано.')

  type GoogleTable = {
    cols: Array<{ label?: string }>
    rows: Array<{ c: Array<{ f?: string; v?: string | number | boolean } | null> }>
  }
  type GoogleResponse = { status: string; table?: GoogleTable }

  const table = await new Promise<GoogleTable>((resolve, reject) => {
    const callbackName = `__unimindSheet_${Date.now()}_${Math.random().toString(36).slice(2)}`
    const callbacks = window as unknown as Record<string, unknown>
    const script = document.createElement('script')
    const timeout = window.setTimeout(() => finish(() => reject(new Error('Google Sheets не відповідає.'))), 12_000)

    function finish(action: () => void) {
      window.clearTimeout(timeout)
      script.remove()
      delete callbacks[callbackName]
      action()
    }

    callbacks[callbackName] = (response: GoogleResponse) => {
      if (response.status === 'ok' && response.table) finish(() => resolve(response.table!))
      else finish(() => reject(new Error('Не вдалося прочитати Google-таблицю.')))
    }
    script.onerror = () => finish(() => reject(new Error('Не вдалося підключитися до Google Sheets.')))
    const url = new URL(`https://docs.google.com/spreadsheets/d/${encodeURIComponent(sheetId)}/gviz/tq`)
    url.searchParams.set('sheet', sheetName)
    url.searchParams.set('tqx', `out:json;responseHandler:${callbackName}`)
    script.src = url.toString()
    document.head.appendChild(script)
  })

  let columns = table.cols.map((column) => column.label || '')
  let sourceRows = table.rows
  if (columns.every((column) => !column) && sourceRows.length) {
    columns = sourceRows[0].c.map((cell, index) => String(cell?.f ?? cell?.v ?? `Колонка ${index + 1}`))
    sourceRows = sourceRows.slice(1)
  }
  const rows = sourceRows.map((row) => columns.map((_, index) => {
    const cell = row.c[index]
    return String(cell?.f ?? cell?.v ?? '')
  }))
  return { columns, rows, updatedAt: new Date().toISOString() }
}
