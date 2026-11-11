// Amazing Talker user flows, redrawn as SVG from the Figma image (coordinates in its 862 x 2000 layout).
(function () {
  const X = [63, 210, 357, 504, 652, 799], NW = 125, NH = 64, DW = 125, DH = 90;
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  let svg = '';
// each line gets an explicit baseline (no dominant-baseline), so text is centred the same in every browser
const FS = {"": 11, b: 11, sm: 10.5};
const text = (cx, cy, s, cls = "") => {
  const lines = s.split("\n"), lh = 16, fs = FS[cls] || 11, y0 = cy - (lines.length - 1) * lh / 2 + fs * 0.36;
  svg += `<text class="fl-t ${cls}" text-anchor="middle">` + lines.map((l, i) => `<tspan x="${cx}" y="${(y0 + i * lh).toFixed(1)}">${esc(l)}</tspan>`).join("") + "</text>";
};
  const node = (c, cy, s, hl) => { const x = X[c]; svg += `<rect class="fl-n${hl ? ' hl' : ''}" x="${x - NW / 2}" y="${cy - NH / 2}" width="${NW}" height="${NH}" rx="18"/>`; text(x, cy, s, hl ? 'b' : ''); };
  const dia = (c, cy, s) => { const x = X[c]; svg += `<path class="fl-n" d="M${x} ${cy - DH / 2}L${x + DW / 2} ${cy}L${x} ${cy + DH / 2}L${x - DW / 2} ${cy}Z"/>`; text(x, cy, s); };
  const line = (pts, arrow = true) => { svg += `<path class="fl-l" d="M${pts.map(p => p.join(' ')).join('L')}"${arrow ? ' marker-end="url(#fl-a)"' : ''}/>`; };
  const tag = (x, y, s) => { const w = s.length * 12 + 6; svg += `<rect class="fl-tag" x="${x - w / 2}" y="${y - 8}" width="${w}" height="16"/>`; text(x, y, s, 'sm'); };
  const title = (y, s) => { svg += `<text class="fl-h" x="0" y="${y}">${esc(s)}</text>`; };
  const R = c => X[c] + NW / 2, L = c => X[c] - NW / 2, dR = c => X[c] + DW / 2, dL = c => X[c] - DW / 2;
  const chain = (cy, cols) => cols.slice(0, -1).forEach(([c, d], i) => { const [c2, d2] = cols[i + 1]; line([[(d ? dR(c) : R(c)) + 4, cy], [(d2 ? dL(c2) : L(c2)) - 3, cy]]); });

  // ---- flow 1 ----
  title(14, '學生使用者流程 1：找教師並預約一堂課');
  ['進入\nLanding page', '搜尋教師\n或為您推薦的教師', '篩選\n語言 / 課程目標 / 價格', '瀏覽教師卡片\n介紹與標籤', '教師個人頁\n影片 / 履歷 / 評價', '選擇課程方案\n查看課程大綱'].forEach((s, i) => node(i, 87, s, i === 0));
  chain(87, [[0], [1], [2], [3], [4], [5]]);
  line([[X[5], 119], [X[5], 150], [X[0], 150], [X[0], 184]]);
  node(0, 218, '選擇可預約時段'); node(1, 218, '點擊「預約課程」'); dia(2, 218, '已登入？'); node(3, 218, '確認預約\n優惠卷 / 付款方式'); dia(4, 218, '付款成功？'); node(5, 218, '送出預約\n等待教師確認');
  chain(218, [[0], [1], [2, 1], [3], [4, 1], [5]]); tag(430, 206, '是'); tag(725, 206, '是');
  line([[X[2], 263], [X[2], 305]]); tag(372, 286, '否'); line([[X[4], 263], [X[4], 305]]); tag(666, 286, '否');
  node(2, 340, '登入 / 註冊'); node(4, 340, '更換付款方式\n重新付款');
  line([[R(2), 340], [L(4), 340]], false); line([[X[3], 340], [X[3], 254]]);
  line([[X[5], 250], [X[5], 408], [X[0], 408], [X[0], 429]]);
  dia(0, 477, '教師接受\n原時段？'); node(1, 477, '行事曆顯示課程\n即將到來'); node(2, 477, '進入教室上課', true);
  chain(477, [[0, 1], [1], [2]]); tag(136, 465, '是');
  line([[X[0], 522], [X[0], 563]]); tag(77, 544, '否');
  node(0, 598, '教師提出新時間\n（課時請求）'); node(1, 598, '學生確認\n或修改時間');
  chain(598, [[0], [1]]); line([[X[1], 566], [X[1], 513]]);

  // ---- flow 2 ----
  title(743, '學生使用者流程 2：先了解平台再決定');
  ['進入\nLanding page', '了解平台優勢\n優點與服務', '查看評價\n最佳課程獎 / 教師分享', '了解企業方案\n與平台數據', '「我是學生」\n查看學生常用功能', '瀏覽熱門活動\n冬令營 / 口說挑戰賽'].forEach((s, i) => node(i, 815, s, i === 0));
  chain(815, [[0], [1], [2], [3], [4], [5]]);
  line([[X[5], 847], [X[5], 878], [X[0], 878], [X[0], 912]]);
  node(0, 947, '查看獎學金\n與優惠卷'); dia(1, 947, '決定在\nAmazing Talker\n上課？'); node(2, 947, '註冊 / 登入'); node(3, 947, '設定學習目標\n與範圍'); node(4, 947, '進入「流程 1」\n找教師並預約', true);
  chain(947, [[0], [1, 1], [2], [3], [4]]); tag(283, 934, '是');
  line([[X[1], 992], [X[1], 1033]]); tag(242, 1014, '還不確定');
  node(1, 1068, '填寫需求表單\n讓平台推薦教師'); dia(2, 1068, '收到推薦\n想試聽嗎？'); node(4, 1068, '收藏教師 / 關注活動\n稍後再回來', true);
  line([[R(1) + 4, 1068], [dL(2) - 3, 1068]]); line([[dR(2) + 2, 1068], [L(4) - 3, 1068]]); tag(504, 1056, '先不要');
  line([[X[2], 1023], [X[2], 982]]); tag(372, 1001, '想');

  // ---- teacher flow ----
  title(1212, '教師使用者流程 Teacher Flow');
  node(0, 1284, '申請成為教師', true); node(1, 1284, '填寫申請資料\n上傳證書與介紹影片'); node(2, 1284, '平台審核'); dia(3, 1284, '審核通過？'); node(4, 1284, '開通教師帳號\nEmail 通知'); node(5, 1284, '登入並切換\n「教師模式」');
  chain(1284, [[0], [1], [2], [3, 1], [4], [5]]); tag(577, 1272, '是');
  line([[X[3], 1329], [X[3], 1370]]); tag(519, 1351, '否');
  node(3, 1405, '補件 / 修改資料');
  line([[L(3), 1405], [X[2], 1405], [X[2], 1319]]); tag(398, 1392, '重新送審');
  line([[X[5], 1316], [X[5], 1474], [X[0], 1474], [X[0], 1508]]);
  node(0, 1542, '教師個人中心\n（Dash Board）'); node(1, 1542, '設定開課時段\n與課程報價'); node(2, 1542, '收到課時請求'); dia(3, 1542, '時段可以嗎？'); node(4, 1542, '接受課程'); node(5, 1542, '行事曆更新\n通知學生');
  chain(1542, [[0], [1], [2], [3, 1], [4], [5]]); tag(577, 1530, '是');
  line([[X[3], 1587], [X[3], 1628]]); tag(519, 1610, '否');
  node(3, 1663, '修改時間\n選擇新日期 / 時段'); node(4, 1663, '學生確認新時間');
  chain(1663, [[3], [4]]);
  line([[R(4), 1663], [X[5], 1663]], false); line([[X[5], 1731], [X[5], 1578]]);
  line([[X[5], 1731], [X[0], 1731], [X[0], 1766]]);
  node(0, 1801, '進入教室上課'); dia(1, 1801, '學生需要\n改期？'); node(2, 1801, '查看近期表現\n收入 / 授課堂數'); node(3, 1801, '本月收入\n申請提領', true);
  chain(1801, [[0], [1, 1], [2], [3]]); tag(283, 1788, '否');
  line([[X[1], 1846], [X[1], 1887]]); tag(225, 1868, '是');
  node(1, 1922, '學生管理\n「編輯時間」'); node(2, 1922, '通知學生\n行事曆顯示已改期');
  chain(1922, [[1], [2]]);
  line([[X[2], 1954], [X[2], 1990], [X[0], 1990], [X[0], 1837]]); tag(210, 1990, '下一堂課');

  const SVG = `<svg class="flow" viewBox="-2 0 866 2000" xmlns="http://www.w3.org/2000/svg">
    <defs><marker id="fl-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1L9 5L1 9" fill="none" stroke="#666" stroke-width="1.6"/></marker></defs>${svg}</svg>`;
  window.IA = window.IA || {};
  window.IA.flow = el => { el.innerHTML = SVG; };
})();
