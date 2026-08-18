import { mkdir, writeFile } from 'node:fs/promises'

const assets = {
  'hero.jpg': 'https://static.wixstatic.com/media/11062b_db208b338f0144aa9f93d2f41c303724f000.jpg/v1/fill/w_1920%2Ch_850%2Cal_c%2Cq_90/11062b_db208b338f0144aa9f93d2f41c303724f000.jpg',
  'cta.jpg': 'https://static.wixstatic.com/media/c837a6_dca8a9f36aff4b8894ef2c9444058dbcf000.jpg/v1/fill/w_1920%2Ch_1080%2Cal_c%2Cq_90/c837a6_dca8a9f36aff4b8894ef2c9444058dbcf000.jpg',
  'speaker-1.jpg': 'https://static.wixstatic.com/media/cff8bb_e306057053c543878a89d607dc63dd65~mv2.jpg/v1/fill/w_980%2Ch_980%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_auto/photo_2026-07-13%2018_51_edited.jpg',
  'speaker-2.jpg': 'https://static.wixstatic.com/media/cff8bb_dc3a195cd16c44f18d3603479b35a312~mv2.jpg/v1/fill/w_720%2Ch_720%2Cal_c%2Cq_85%2Cenc_auto/photo_2026-07-13%2018_edited.jpg',
  'speaker-3.jpg': 'https://static.wixstatic.com/media/cff8bb_b6fd90681dd147cca6a43bac1932e29d~mv2.jpg/v1/fill/w_980%2Ch_980%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_auto/Gemini_Generated_Image_6zyso06zyso06zys%20%281%29_edited_edited.jpg',
  'review-1.png': 'https://static.wixstatic.com/media/cff8bb_a9cc440aea3f43e9a169756914bea123~mv2.png/v1/fill/w_980%2Ch_900%2Cal_c%2Cq_90/%D0%9A%D1%83%D1%80%D1%81%20_%D0%9F%D1%81%D0%B8%D1%85%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D1%8F%20%D1%81%D0%BF%D0%BE%D1%80%D1%82%D1%83_.png',
  'review-2.png': 'https://static.wixstatic.com/media/cff8bb_f54ff34a4efe44bf9cc5f08bf63034aa~mv2.png/v1/fill/w_980%2Ch_900%2Cal_c%2Cq_90/%D0%9A%D1%83%D1%80%D1%81%20_%D0%9F%D1%81%D0%B8%D1%85%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D1%8F%20%D1%81%D0%BF%D0%BE%D1%80%D1%82%D1%83_.png',
  'review-3.png': 'https://static.wixstatic.com/media/cff8bb_2a6272a84fb5408a92c3c6d44556cd8f~mv2.png/v1/fill/w_980%2Ch_900%2Cal_c%2Cq_90/%D0%9A%D1%83%D1%80%D1%81%20_%D0%9F%D1%81%D0%B8%D1%85%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D1%8F%20%D0%BC%D0%B8%D1%81%D1%82%D0%B5%D1%86%D1%82%D0%B2%D0%B0_.png',
  'review-4.png': 'https://static.wixstatic.com/media/cff8bb_0e929c99247c4c4d9bb962a017d255ec~mv2.png/v1/fill/w_980%2Ch_900%2Cal_c%2Cq_90/%D0%9A%D1%83%D1%80%D1%81%20_%D0%9F%D1%81%D0%B8%D1%85%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D1%8F%20%D0%BC%D0%B8%D1%81%D1%82%D0%B5%D1%86%D1%82%D0%B2%D0%B0_.png',
  'review-5.png': 'https://static.wixstatic.com/media/cff8bb_41373f066a6946479b5cdb44f641afcd~mv2.png/v1/fill/w_980%2Ch_900%2Cal_c%2Cq_90/%D0%9A%D1%83%D1%80%D1%81%20_%D0%9F%D1%81%D0%B8%D1%85%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D1%8F%20%D1%81%D0%BF%D0%BE%D1%80%D1%82%D1%83_.png',
  'review-6.png': 'https://static.wixstatic.com/media/cff8bb_3c47d6813250445c8089691d5ecc0eca~mv2.png/v1/fill/w_980%2Ch_900%2Cal_c%2Cq_90/%D0%9A%D1%83%D1%80%D1%81%20_%D0%9F%D1%81%D0%B8%D1%85%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D1%8F%20%D1%81%D0%BF%D0%BE%D1%80%D1%82%D1%83_.png',
  'review-7.png': 'https://static.wixstatic.com/media/cff8bb_a75c7ee4020247f2a32c906f9ee60772~mv2.png/v1/fill/w_980%2Ch_900%2Cal_c%2Cq_90/%D0%9A%D1%83%D1%80%D1%81%20_%D0%9F%D1%81%D0%B8%D1%85%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D1%8F%20%D1%81%D0%BF%D0%BE%D1%80%D1%82%D1%83_.png',
  'review-8.png': 'https://static.wixstatic.com/media/cff8bb_fe4788d8def84628ad00a3a01c9d4a20~mv2.png/v1/fill/w_980%2Ch_900%2Cal_c%2Cq_90/%D0%9A%D1%83%D1%80%D1%81%20_%D0%9F%D1%81%D0%B8%D1%85%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D1%8F%20%D1%81%D0%BF%D0%BE%D1%80%D1%82%D1%83_.png'
}

await mkdir(new URL('../public/assets/', import.meta.url), { recursive: true })
for (const [name, url] of Object.entries(assets)) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${name}: ${res.status} ${res.statusText}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  await writeFile(new URL(`../public/assets/${name}`, import.meta.url), buffer)
  console.log(`saved ${name} (${buffer.length} bytes)`)
}
