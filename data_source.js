import db from './db.js';
import Currency from './models/currency.js';


const url = 'https://v6.exchangerate-api.com/v6/49b901d18c25b0ae973a2e6c/latest/USD';

function formatDateToYYYYMMDD(dateStr) {
  const date = new Date(dateStr);
  const year = date.getUTCFullYear();
  const month = `${date.getUTCMonth() + 1}`.padStart(2, '0');
  const day = `${date.getUTCDate()}`.padStart(2, '0');
  return parseInt(`${year}${month}${day}`);
}

async function updateExchangeData() {
  const data = await (await fetch(url)).json();
  const rates = data.conversion_rates;
  const baseCode = data.base_code; // e.g., 'USD'
  const date = formatDateToYYYYMMDD(data.time_last_update_utc); // YYYYMMDD int

  const allActiveCurrencies = await Currency.search(null, null, null, 1);
  const codeToIdMap = new Map();
  allActiveCurrencies.forEach(currency => codeToIdMap.set(currency.code, currency.id));

  const baseId = codeToIdMap.get(baseCode);
  if (!baseId) {
    // console.error(`❌ 基准货币 ${baseCode} 不存在或未激活`);
    return;
  }

  for (const [code, rate] of Object.entries(rates)) {
    const data = await (await fetch(url)).json();
    const rates = data.conversion_rates;
    const baseCode = data.base_code;
    const date = formatDateToYYYYMMDD(data.time_last_update_utc);

    // 一次性查出所有 is_active 的货币
    const allActive = await Currency.search(null, null, null, true);
    const codeToIdMap = new Map();
    allActive.forEach(cur => codeToIdMap.set(cur.code, cur.id));

    const baseId = codeToIdMap.get(baseCode);
    if (!baseId) {
      // console.error(`❌ Base currency ${baseCode} 不存在或未激活`);
      return;
    }

    for (const [code, rate] of Object.entries(rates)) {
      const currencyId = codeToIdMap.get(code);
      if (!currencyId) {
        //   console.log(`⏭️ 跳过 ${code}：未激活或未定义`);
        continue;
      }

      try {
        await db.query(
          `INSERT INTO exchange_rate (currency_id, base, date, rate)
           VALUES (?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE rate = VALUES(rate)`,
          [currencyId, baseId, date, rate]
        );
        console.log(`✅ 插入成功：${baseCode} ➡ ${code} = ${rate}`);
      } catch (err) {
        console.error(`⚠️ 插入 ${code} 时出错：`, err.message);
      }
    }
  }
};

updateExchangeData();