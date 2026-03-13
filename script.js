const DESTINO = "https://forms.office.com/r/0bfxeDyQXh?origin=lprLink"; // Coloque seu link real aqui

function processAuth() {
    const val = document.getElementById('answer').value;
    if (val === "5") {
        runSuccessSequence();
    } else {
        runFailSequence();
    }
}

// --- SEQUÊNCIA DE ERRO (RITMO LENTO) ---
async function runFailSequence() {
    document.getElementById('main-shell').style.display = 'none';
    document.getElementById('hacker-terminal').style.display = 'block';
    
    const logBox = document.getElementById('fail-logs');
    const bar = document.getElementById('fail-bar');
    const status = document.getElementById('fail-status');

    const failMsgs = [
        "Localizando dispositivo... OK",
        "Identificando usuário via GPS... ENCONTRADO",
        "Tentando acesso à câmera frontal...",
        "ERRO: Firewall detectado. Iniciando Bypass...",
        "Bypass concluído. Acessando arquivos privados...",
        "Criptografando pasta 'Documentos'...",
        "Enviando dados para servidor remoto...",
        "SISTEMA CORROMPIDO COM SUCESSO."
    ];

    for (let i = 0; i < failMsgs.length; i++) {
        const p = document.createElement('div');
        p.innerHTML = `<span style="color: #666;">[${new Date().toLocaleTimeString()}]</span> ${failMsgs[i]}`;
        logBox.appendChild(p);
        
        bar.style.width = ((i + 1) / failMsgs.length) * 100 + "%";
        status.innerText = `PROCESSANDO: ${Math.round(((i + 1) / failMsgs.length) * 100)}%`;

        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
        
        // Espera 1.8 segundos para o aluno ler cada linha
        await new Promise(r => setTimeout(r, 1800));
    }

    status.innerText = "ADEUS.";
    await new Promise(r => setTimeout(r, 2000));
    
    document.getElementById('hacker-terminal').style.display = 'none';
    startMatrix();
}

// --- SEQUÊNCIA DE SUCESSO ---
async function runSuccessSequence() {
    document.getElementById('main-shell').style.display = 'none';
    document.getElementById('success-screen').style.display = 'block';
    
    const logs = document.getElementById('success-logs');
    const bar = document.getElementById('success-bar');

    const successMsgs = [
        "Verificando credenciais...",
        "Chave de criptografia aceita.",
        "Estabelecendo túnel VPN...",
        "Redirecionando tráfego seguro..."
    ];

    for (let i = 0; i < successMsgs.length; i++) {
        logs.innerHTML += `<div>> ${successMsgs[i]}</div>`;
        bar.style.width = ((i + 1) / successMsgs.length) * 100 + "%";
        await new Promise(r => setTimeout(r, 1200));
    }

    window.location.href = DESTINO;
}

// --- EFEITO MATRIX ---
function startMatrix() {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    canvas.style.display = 'block';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#0F0";
        ctx.font = fontSize + "px Courier";
        for (let i = 0; i < drops.length; i++) {
            const text = Math.floor(Math.random() * 2);
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    setInterval(draw, 50);
}