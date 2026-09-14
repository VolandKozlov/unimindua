<template>
  <main class="admin-users-page">
    <header class="admin-users-header">
      <RouterLink class="admin-users-header__logo" to="/" aria-label="UNIMIND — на головну">
        <img src="/assets/logo/unimind-logo.png" alt="UNIMIND">
      </RouterLink>
      <RouterLink class="registry-back" to="/">На головну</RouterLink>
    </header>

    <section class="admin-users-content" aria-labelledby="users-title">
      <div class="admin-users-title">
        <div>
          <p>Відкриті дані</p>
          <h1 id="users-title">Реєстр</h1>
        </div>
        <button class="refresh-button" type="button" :disabled="loading" @click="loadUsers">
          {{ loading ? 'Оновлення…' : 'Оновити дані' }}
        </button>
      </div>

      <div class="users-card">
        <div class="users-toolbar">
          <label>
            Показати
            <select v-model.number="pageSize">
              <option :value="10">10</option>
              <option :value="25">25</option>
              <option :value="50">50</option>
              <option :value="100">100</option>
            </select>
            записів
          </label>

          <label class="search-field">
            <span>Пошук</span>
            <input v-model.trim="search" type="search" placeholder="Ім’я, email або телефон">
          </label>
        </div>

        <div v-if="error" class="table-message table-message--error" role="alert">
          <p>{{ error }}</p>
          <button type="button" @click="loadUsers">Спробувати ще раз</button>
        </div>

        <div v-else class="table-wrap" :aria-busy="loading">
          <table v-if="columns.length">
            <thead>
              <tr>
                <th v-for="(column, index) in columns" :key="`${column}-${index}`">
                  <button type="button" @click="sortBy(index)">
                    {{ column || `Колонка ${index + 1}` }}
                    <span :class="{ active: sortColumn === index }" aria-hidden="true">
                      {{ sortColumn === index ? (sortDirection > 0 ? '▲' : '▼') : '↕' }}
                    </span>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, rowIndex) in pageRows" :key="`${page}-${rowIndex}`">
                <td v-for="(_, index) in columns" :key="index">{{ row[index] || '—' }}</td>
              </tr>
              <tr v-if="!pageRows.length">
                <td class="table-message" :colspan="columns.length">
                  {{ loading ? 'Завантаження даних…' : 'Нічого не знайдено' }}
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else class="table-message">{{ loading ? 'Завантаження даних…' : 'Записи відсутні' }}</div>
        </div>

        <footer class="users-footer">
          <div>
            <p>{{ summary }}</p>
            <small v-if="updatedAt">Оновлено: {{ updatedAt }}</small>
          </div>
          <nav v-if="pageCount > 1" class="pagination" aria-label="Сторінки таблиці">
            <template v-for="(item, index) in pageNumbers" :key="`${item}-${index}`">
              <span v-if="item === '…'">…</span>
              <button
                v-else
                type="button"
                :class="{ active: item === page }"
                :aria-current="item === page ? 'page' : undefined"
                @click="page = Number(item)"
              >{{ item }}</button>
            </template>
          </nav>
        </footer>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { getRegistryEntries } from '../services/registry'

const columns = ref<string[]>([])
const rows = ref<string[][]>([])
const loading = ref(true)
const error = ref('')
const updated = ref('')
const search = ref('')
const pageSize = ref(10)
const page = ref(1)
const sortColumn = ref(-1)
const sortDirection = ref(1)

const visibleRows = computed(() => {
  const query = search.value.toLocaleLowerCase('uk')
  const filtered = query
    ? rows.value.filter((row) => row.some((value) => String(value).toLocaleLowerCase('uk').includes(query)))
    : [...rows.value]

  if (sortColumn.value >= 0) {
    filtered.sort((a, b) => String(a[sortColumn.value] || '').localeCompare(
      String(b[sortColumn.value] || ''),
      'uk',
      { numeric: true },
    ) * sortDirection.value)
  }

  return filtered
})

const pageCount = computed(() => Math.max(1, Math.ceil(visibleRows.value.length / pageSize.value)))
const pageRows = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return visibleRows.value.slice(start, start + pageSize.value)
})
const summary = computed(() => {
  if (!visibleRows.value.length) return 'Записи відсутні'
  const start = (page.value - 1) * pageSize.value + 1
  const end = Math.min(start + pageSize.value - 1, visibleRows.value.length)
  return `Записи з ${start} по ${end} із ${visibleRows.value.length}`
})
const updatedAt = computed(() => updated.value
  ? new Intl.DateTimeFormat('uk-UA', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(updated.value))
  : '')
const pageNumbers = computed<Array<number | '…'>>(() => {
  if (pageCount.value <= 7) return Array.from({ length: pageCount.value }, (_, index) => index + 1)
  const numbers = [...new Set([1, page.value - 1, page.value, page.value + 1, pageCount.value])]
    .filter((number) => number > 0 && number <= pageCount.value)
    .sort((a, b) => a - b)
  return numbers.flatMap((number, index) => index && number - numbers[index - 1] > 1 ? ['…', number] : [number])
})

watch([search, pageSize], () => { page.value = 1 })
watch(pageCount, (count) => { page.value = Math.min(page.value, count) })

function sortBy(index: number) {
  sortDirection.value = sortColumn.value === index ? -sortDirection.value : 1
  sortColumn.value = index
}

async function loadUsers() {
  loading.value = true
  error.value = ''
  try {
    const data = await getRegistryEntries()
    columns.value = data.columns
    rows.value = data.rows
    updated.value = data.updatedAt
  } catch (reason) {
    error.value = reason instanceof Error ? reason.message : 'Не вдалося завантажити таблицю.'
  } finally {
    loading.value = false
  }
}

onMounted(loadUsers)
</script>

<style scoped lang="scss">
.admin-users-page { min-height: 100vh; background: #f4f6f2; }

.admin-users-header {
  min-height: 76px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 14px 40px;
  color: #fff;
  background: var(--navy);

  &__logo { width: 150px; }
  .registry-back { padding: 9px 14px; border: 1px solid rgba(255,255,255,.35); border-radius: 20px; color: #fff; font-size: 13px; }
}

.admin-users-content { width: min(1440px, calc(100% - 80px)); margin: 0 auto; padding: 64px 0 80px; }
.admin-users-title {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 24px;
  margin-bottom: 38px;

  p { margin: 0 0 8px; color: var(--green-dark); font-size: 14px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
  h1 { margin: 0; font-size: clamp(52px, 7vw, 96px); line-height: .95; letter-spacing: -.055em; }
}

.refresh-button {
  min-height: 46px;
  padding: 10px 18px;
  border: 0;
  border-radius: 9px;
  color: #fff;
  background: var(--navy);
  cursor: pointer;
  &:disabled { cursor: wait; opacity: .6; }
}

.users-card { overflow: hidden; border: 1px solid var(--line); border-radius: 18px; background: #fff; box-shadow: var(--shadow); }
.users-toolbar, .users-footer { display: flex; justify-content: space-between; align-items: center; gap: 20px; padding: 20px 24px; }
.users-toolbar {
  label { display: flex; align-items: center; gap: 10px; }
  select, input { min-height: 42px; padding: 8px 12px; border: 1px solid rgba(11,37,51,.25); border-radius: 8px; background: #fff; outline: none; }
  select:focus, input:focus { border-color: var(--green-dark); box-shadow: 0 0 0 3px rgba(155,217,141,.2); }
  .search-field span { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  .search-field input { width: min(320px, 40vw); }
}

.table-wrap { width: 100%; overflow-x: auto; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
table { width: 100%; border-collapse: collapse; }
th, td { min-width: 170px; padding: 15px 20px; border-bottom: 1px solid var(--line); text-align: left; white-space: nowrap; }
th { color: var(--navy); background: #dff0dc; font-family: var(--heading-font); }
th button { width: 100%; display: flex; justify-content: space-between; gap: 12px; padding: 0; border: 0; font-weight: 700; background: transparent; cursor: pointer; }
th span { color: rgba(11,37,51,.35); font-family: sans-serif; }
th span.active { color: var(--navy); }
tbody tr:last-child td { border-bottom: 0; }
tbody tr:nth-child(even) { background: #fafbf9; }
tbody tr:hover { background: rgba(155,217,141,.13); }
.table-message { width: 100%; padding: 44px 24px; color: var(--muted); text-align: center; }
.table-message--error { border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); color: #a72c2c; }
.table-message--error p { margin: 0 0 12px; }
.table-message--error button { border: 0; color: var(--navy); background: transparent; text-decoration: underline; cursor: pointer; }
.users-footer p { margin: 0; }
.users-footer small { display: block; margin-top: 3px; color: var(--muted); }
.pagination { display: flex; align-items: center; gap: 4px; }
.pagination button { min-width: 38px; min-height: 38px; border: 1px solid transparent; border-radius: 8px; background: transparent; cursor: pointer; }
.pagination button.active { color: #fff; border-color: var(--navy); background: var(--navy); }

@media (max-width: 760px) {
  .admin-users-header { padding-inline: 18px; }
  .admin-users-content { width: calc(100% - 32px); padding: 44px 0 60px; }
  .admin-users-title { align-items: stretch; flex-direction: column; }
  .admin-users-title h1 { font-size: 54px; }
  .refresh-button { align-self: flex-start; }
  .users-toolbar, .users-footer { align-items: stretch; flex-direction: column; }
  .users-toolbar label, .users-toolbar .search-field input { width: 100%; }
  .users-footer { font-size: 14px; }
}
</style>
