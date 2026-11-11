// Information-architecture diagrams rebuilt as real text (the Figma versions are low-resolution images).
// Content transcribed from the Figma images; layout follows the same visual language.
window.IA = (() => {
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const pill = (p) => typeof p === 'string' ? `<span class="ia-p">${esc(p)}</span>` : `<span class="ia-p${p.main ? ' main' : ''}${p.cls ? ' ' + p.cls : ''}">${esc(p.t)}</span>`;
  const arrow = '<i class="ia-arr"></i>';
  // a row: first pill, then "→ target → target ..."
  const chain = (row) => {
    const parts = Array.isArray(row) ? row : [row];
    return parts.map((p, i) => `<span class="ia-cell">${pill(p)}${i < parts.length - 1 ? arrow : ''}</span>`).join('');
  };
  const items = (list) => `<div class="ia-items">${list.map(r => `<div class="ia-item">${chain(r)}</div>`).join('')}</div>`;
  const col = (c) => `<div class="ia-col"><div class="ia-head">${chain(c.head)}</div>${c.items ? `<div class="ia-under"${c.under ? ` data-under="${c.under}"` : ''}>${items(c.items)}</div>` : ''}</div>`;
  const section = (s) => `<section class="ia-sec"><div class="ia-head">${chain(s.head)}</div>
    ${(s.rows || []).map(r => `<div class="ia-row">${r.map(col).join('')}</div>`).join('')}
    ${s.items ? `<div class="ia-under">${items(s.items)}</div>` : ''}</section>`;

  const AT = {
    root: {t: 'Amazing Talker Landing page', main: true},
    sections: [
      {head: ['登入 / 註冊', '註冊 / 快速登入', '設定學習目標與範圍', {t: '學生（Dash Board）', main: true}]},
      {head: [{t: '成為老師 / 學習模式', main: true}], rows: [[{head: [{t: '教師（Dash Board）', main: true}]}, {head: [{t: '學生（Dash Board）', main: true}]}]]},
      {head: [{t: '搜尋教師（Dash Board）', main: true}], rows: [
        [{head: ['語言分類'], items: ['英語', '日語', '韓語', '中文', '西班牙語', '法語', '德語', '義大利語', '阿拉伯語']},
         {head: ['課程目標'], items: ['會話練習', '考試準備', '商用語言', '兒童語言']},
         {head: ['篩選與搜尋'], items: ['關鍵字搜尋', '價格', '上課時間', '老師來自', '清除篩選']},
         {head: ['需求表單'], items: [['填寫學習需求', '專人聯繫']]}],
        [{head: ['教師卡片列表', {t: '教師個人頁', main: true}], under: 1, items: ['介紹影片', '關於我 / 履歷和證書', '教學模式', ['聯絡教師', '訊息視窗'], ['課程選擇', '課程大綱（彈窗）'], ['預約時段表', '選擇時段'], ['預約課程', '確認預約（彈窗）', '付款', '預約成功', '學生 Dash Board'], ['收藏教師 ♡', '教師關注列表'], ['為您推薦的教師', '其他教師個人頁']]}],
      ]},
      {head: [{t: '關於我們', main: true}], rows: [
        [{head: ['品牌故事與評價'], items: [['了解更多', '品牌故事'], ['最佳課程獎票選評價', '教師個人頁'], '教師教學分享']},
         {head: ['適合族群'], items: [['最佳課程規劃', '搜尋教師'], ['時間彈性', '課程預約流程'], ['專屬課程', '課程目標篩選'], ['頂尖教師', '多元教學 優質師資']]}],
        [{head: ['企業方案'], items: ['合作企業', '平台數據：教師 / 語言 / 學員', ['了解企業方案', '企業諮詢表單']]},
         {head: ['新手指南'], items: ['課程預約流程 4 步驟', ['瀏覽全部課程', '搜尋教師']]}],
      ]},
      {head: ['我是學生'], rows: [
        [{head: ['學生個人中心'], items: ['我的行事曆（月曆）', ['即將到來的課程', '進入教室'], ['課時請求', '修改時間 / 確認時間'], ['為您推薦的教師', '教師個人頁'], ['熱門活動', '活動詳情', '報名'], '學生使用指南']},
         {head: ['學生常用功能'], items: [['購課紀錄', '課程購買明細'], ['優惠卷', '使用·下次預約折抵'], ['學習影音', '我的收藏影片']]}],
        [{head: ['獎學金申請'], items: [['填寫申請表', '送出·審核通知']]},
         {head: ['需求表單'], items: [['填寫學習需求 / 聯絡資訊', '專人聯繫']]}],
      ]},
      {head: ['優質教師'], rows: [
        [{head: ['教師個人中心'], items: ['我的行事曆（月曆）', ['今日課程', '學生資料（彈窗）'], ['課時請求', '接受 / 修改時間'], ['學生管理', '訊息 / 修改時間', '通知學生'], ['近期表現', '本月收入 / 流量表現'], '教師使用指南']},
         {head: ['教師常用功能'], items: [['開課時段', '設定每週時段'], ['課程報價', '調整價格'], ['專屬優惠', '建立折扣碼'], ['自動回覆', '設定回覆內容']]},
         {head: ['教師採訪'], items: ['教師教學分享']}],
        [{head: ['成為教師'], items: [['填寫申請資料', '平台審核', '開通教師帳號']]},
         {head: ['最佳課程獎'], items: [['票選評價', '教師個人頁']]},
         {head: ['短影音教學天地'], items: ['影片列表 / 上傳影音']}],
      ]},
      {head: [{t: '個人資訊側邊導覽列', main: true}], rows: [
        [{head: ['學生選單'], items: [['個人中心', '學生 Dash Board'], ['課程行事曆', '行事曆區塊'], ['教師關注列表', '教師個人頁'], ['我的收藏影片', '學習短影片'], '課程購買明細', '優惠卷', '退換課程', ['帳號設定', '個人資料 / 通知'], ['登出', '回到 Landing page']]},
         {head: ['教師選單'], items: [['個人中心', '教師 Dash Board'], ['課程行事曆', '行事曆區塊'], ['教師檔案編輯', '更新介紹與影片'], ['教師功能控制面板', '教師常用功能'], ['本月收入', '申請提領'], ['教學數據分析', '近 6 個月表現'], ['影音編輯', '上傳新影片'], ['帳號設定', '個人資料 / 通知'], ['登出', '回到 Landing page']]}],
      ]},
      {head: ['首頁內容區塊'], items: [['Hero：免費試聽', '搜尋教師'], ['Hero：進入學習中心', '學生 Dash Board'], ['About Amazing Talker', '品牌故事'], '優點與服務', ['課程預約流程', '瀏覽全部課程'], ['企業機構語言培訓', '企業諮詢表單'], '最佳課程獎票選評價', '教師教學分享', ['多元教學 優質師資', '瀏覽全部課程'], ['需求表單', '需求表單 / 選擇攻略']]},
      {head: ['頁尾 Footer'], rows: [
        [{head: ['工作機會'], items: [['加入 Amazing Talker', '所有工作機會'], '找學生', ['成為教師', '申請表單'], ['家教費用諮詢', '需求表單'], '聯盟行銷計畫']},
         {head: ['Amazing Talker'], items: [['關於我們', '品牌故事'], ['Youtube', '影片頻道'], '外語學習資源']}],
      ]},
    ],
  };

  function renderAT(el) {
    el.innerHTML = `<div class="ia ia-at">
      <div class="ia-legend"><span><i class="lg main"></i>主要頁面 / 入口</span><span><i class="lg"></i>功能 / 內容區塊</span><span><i class="lg-arr"></i>點擊後前往</span></div>
      <div class="ia-root">${pill(AT.root)}</div>
      <div class="ia-trunk">${AT.sections.map(section).join('')}</div></div>`;
    // items that hang under the 2nd pill of a head ("教師卡片列表 → 教師個人頁")
    el.querySelectorAll('[data-under]').forEach(u => {
      const head = u.previousElementSibling, cell = head.children[+u.dataset.under];
      u.style.marginLeft = (cell.offsetLeft - head.offsetLeft) + 'px';
    });
  }

  // ---- Multiverse Garden: flow list (Figma "截圖 2026-10-16 12.42.49") ----
  const P = t => ({t, k: 'param'}), I = t => ({t, k: 'touch'}), OK = t => ({t, k: 'ok'}), NO = t => ({t, k: 'fail'});
  const SEP = '›', OR = '/';
  const BUY = [P('設定色系及預算'), SEP, I('透過『花禮推薦』移動個性與色系數值'), SEP, '挑選商品，加入購物車', SEP, '結帳', SEP, '登入 / 建立會員或訪客購物', SEP, '輸入配送資訊及付款方式', SEP, OK('付款成功，完成訂購'), OR, NO('付款失敗'), SEP, '訂單查詢'];
  const CUSTOM = [I('填寫顧客需求單，預約討論時間'), SEP, '門市預約諮詢', OR, '與花藝師線上討論', SEP, OK('報價與製作')];
  const MG = [
    {cat: '空間 盆花 / 佈置', cards: [
      {title: '大型盆花　小型盆花', note: '（共用同一條流程）', flows: [BUY]},
      {title: '商業空間　婚禮佈置　居家擺設', note: '（共用同一條流程）', flows: [['案件範例與報價', SEP, ...CUSTOM]]},
      {title: '居家擺設', flows: [['小型永生植物裝置', SEP, '挑選商品，加入購物車', SEP, '結帳', SEP, '登入 / 建立會員或訪客購物', SEP, '輸入配送資訊及付款方式', SEP, OK('付款成功，完成訂購'), OR, NO('付款失敗'), SEP, '訂單查詢']]},
    ]},
    {cat: '花束', cards: [{title: '約會花束　生日 / 祝賀花束　探望花束', note: '（共用同一條流程）', flows: [BUY]}]},
    {cat: '品牌節慶系列', cards: [
      {title: '母親節花禮　情人節花禮', note: '（共用同一條流程）', flows: [BUY]},
      {title: '婚宴 / 拍攝用花', flows: [{lead: '↳', f: ['案件範例與報價']},
        {sub: '線上訂購', f: [P('設定色系及預算'), SEP, '挑選商品，加入購物車', SEP, '結帳', SEP, '登入 / 建立會員或訪客購物', SEP, '輸入配送資訊及付款方式', SEP, OK('付款成功，完成訂購'), OR, NO('付款失敗'), SEP, '訂單查詢']},
        {sub: '客製諮詢', f: CUSTOM}]},
    ]},
    {cat: '探索品牌服務', cards: [
      {title: '品牌故事與門市', flows: [['近期活動企劃', OR, '門市地址']]},
      {title: '線上體驗插花', flows: [[I('線上插花互動體驗'), SEP, '分享至社群 / 預約門市花藝體驗課程']]},
      {title: '花藝體驗課程', flows: [['課程資訊與流程說明', SEP, I('前往預約'), SEP, '填寫顧客資訊，預約課程時間', SEP, '結帳', SEP, '登入 / 建立會員或訪客購物', SEP, '選擇付款方式', SEP, OK('付款成功，日期提醒（加入行事曆）'), OR, NO('付款失敗'), SEP, '訂單查詢']]},
      {title: '聯絡我們 / 客製化需求', flows: [CUSTOM]},
    ]},
  ];
  const chip = c => c === SEP ? '<b class="mg-sep">›</b>' : c === OR ? '<b class="mg-or">/</b>' : typeof c === 'string' ? `<span class="mg-c">${esc(c)}</span>` : `<span class="mg-c ${c.k}">${esc(c.t)}</span>`;
  const flow = f => {
    if (Array.isArray(f)) return `<div class="mg-flow">${f.map(chip).join('')}</div>`;
    return `${f.sub ? `<div class="mg-sub">${esc(f.sub)}</div>` : ''}<div class="mg-flow">${f.lead ? `<b class="mg-lead">${f.lead}</b>` : ''}${f.f.map(chip).join('')}</div>`;
  };
  function renderMG(el) {
    el.innerHTML = `<div class="ia ia-mg">
      <div class="mg-top"><span class="mg-root">進入 Multiverse Garden</span><i class="mg-dash"></i><span class="mg-c">Hero section 動態影像，用視覺聆聽品牌故事</span></div>
      <div class="mg-trunk">${MG.map(g => `<div class="mg-cat"><span class="mg-catp">${esc(g.cat)}</span>
        ${g.cards.map(c => `<div class="mg-card"><div class="mg-title">${esc(c.title)}${c.note ? `<small>${esc(c.note)}</small>` : ''}</div>${c.flows.map(flow).join('')}</div>`).join('')}</div>`).join('')}</div>
      <div class="mg-nav"><div class="mg-navlbl">Nav bar　全站共用功能</div>
        <div class="mg-flow"><span class="mg-c">搜尋</span><span class="mg-c">購物車</span><span class="mg-c">會員中心</span><b class="mg-sep">›</b><span class="mg-c">個人資料</span><span class="mg-c">我的訂單</span></div>
        <div class="mg-legend"><span><i></i>一般頁面 / 動作</span><span><i class="touch"></i>介面互動觸點</span><span><i class="param"></i>參數設定</span><span><i class="ok"></i>完成狀態</span><span><i class="fail"></i>失敗狀態</span></div></div></div>`;
  }
  return {at: renderAT, mg: renderMG};
})();
