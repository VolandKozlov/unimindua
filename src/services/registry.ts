export type SheetTable = {
  columns: string[]
  rows: string[][]
  updatedAt: string
}

export async function getRegistryEntries(): Promise<SheetTable> {
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
