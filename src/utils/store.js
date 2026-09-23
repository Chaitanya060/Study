// Small IndexedDB wrapper used to persist uploaded PDFs and personal notes
// until the user deletes them. Falls back to localStorage (without blobs)
// if IndexedDB is unavailable (e.g. some private-mode browsers).

const DB_NAME = 'ip_db'
const DB_VERSION = 1
const STORES = ['pdfTopics', 'notes']

let dbPromise = null
let useLS = false

function openDB() {
  if (dbPromise) return dbPromise
  dbPromise = new Promise((resolve, reject) => {
    let req
    try {
      req = indexedDB.open(DB_NAME, DB_VERSION)
    } catch (e) {
      reject(e)
      return
    }
    req.onupgradeneeded = () => {
      const db = req.result
      for (const s of STORES) {
        if (!db.objectStoreNames.contains(s)) db.createObjectStore(s, { keyPath: 'id' })
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
  return dbPromise
}

// ---- localStorage fallback (blobs are dropped, since they can't be serialized) ----
const lsKey = (store) => `ip_ls_${store}`
function lsGetAll(store) {
  try {
    return JSON.parse(localStorage.getItem(lsKey(store)) || '[]')
  } catch {
    return []
  }
}
function lsSet(store, arr) {
  try {
    localStorage.setItem(lsKey(store), JSON.stringify(arr))
  } catch {
    /* quota — ignore */
  }
}
function stripBlobs(val) {
  const copy = { ...val }
  delete copy.pdf
  return copy
}

export async function idbGetAll(store) {
  if (useLS) return lsGetAll(store)
  try {
    const db = await openDB()
    return await new Promise((resolve, reject) => {
      const req = db.transaction(store, 'readonly').objectStore(store).getAll()
      req.onsuccess = () => resolve(req.result || [])
      req.onerror = () => reject(req.error)
    })
  } catch {
    useLS = true
    return lsGetAll(store)
  }
}

export async function idbPut(store, value) {
  if (useLS) {
    const arr = lsGetAll(store).filter((x) => x.id !== value.id)
    arr.push(stripBlobs(value))
    lsSet(store, arr)
    return
  }
  try {
    const db = await openDB()
    await new Promise((resolve, reject) => {
      const req = db.transaction(store, 'readwrite').objectStore(store).put(value)
      req.onsuccess = () => resolve()
      req.onerror = () => reject(req.error)
    })
  } catch {
    useLS = true
    const arr = lsGetAll(store).filter((x) => x.id !== value.id)
    arr.push(stripBlobs(value))
    lsSet(store, arr)
  }
}

export async function idbDelete(store, key) {
  if (useLS) {
    lsSet(
      store,
      lsGetAll(store).filter((x) => x.id !== key),
    )
    return
  }
  try {
    const db = await openDB()
    await new Promise((resolve, reject) => {
      const req = db.transaction(store, 'readwrite').objectStore(store).delete(key)
      req.onsuccess = () => resolve()
      req.onerror = () => reject(req.error)
    })
  } catch {
    useLS = true
    lsSet(
      store,
      lsGetAll(store).filter((x) => x.id !== key),
    )
  }
}
