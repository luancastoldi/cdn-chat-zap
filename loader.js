(function () {
    const script = document.currentScript;
    const url = new URL(script.src);

    const ph = url.searchParams.get('ph');
    const msg = url.searchParams.get('msg');
    const anw = url.searchParams.get('anw');
    const isOpen = url.searchParams.get('isOpen');

    if (!ph) return;

    const iframe = document.createElement('iframe');
    const urlCDN = `https://cdn-chat-zap.vercel.app/`;
    iframe.src = `${urlCDN}chat.html?ph=${ph}&msg=${msg}&anw=${anw}&isOpen=${isOpen}`;

    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '280px';
    iframe.style.height = '360px';
    iframe.style.border = 'none';
    iframe.style.zIndex = '99999999';
    
    document.body.appendChild(iframe);
})();
