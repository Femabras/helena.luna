document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector('.hero .button');
    if (!button) return;

    button.addEventListener('click', function (e) {
        e.preventDefault();

        // Cria o modal se não existir
        if (!document.getElementById('calendar-modal')) {
            const modal = document.createElement('div');
            modal.id = 'calendar-modal';
            modal.style.position = 'fixed';
            modal.style.top = 0;
            modal.style.left = 0;
            modal.style.width = '100vw';
            modal.style.height = '100vh';
            modal.style.background = 'rgba(0,0,0,0.6)';
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.zIndex = 9999;

            // Get today's date and time
            const now = new Date();
            const yyyy = now.getFullYear();
            const mm = String(now.getMonth() + 1).padStart(2, '0');
            const dd = String(now.getDate()).padStart(2, '0');
            const todayStr = `${yyyy}-${mm}-${dd}`;

            // Only allow today if time is before 19:00
            let minDate = todayStr;
            let showToday = true;
            if (now.getHours() >= 19) {
                // After 19:00, only allow from tomorrow
                const tomorrow = new Date(now);
                tomorrow.setDate(now.getDate() + 1);
                const tyyyy = tomorrow.getFullYear();
                const tmm = String(tomorrow.getMonth() + 1).padStart(2, '0');
                const tdd = String(tomorrow.getDate()).padStart(2, '0');
                minDate = `${tyyyy}-${tmm}-${tdd}`;
                showToday = false;
            }

            modal.innerHTML = `
                <div style="
                    background: #fff;
                    color: #44302b;
                    border-radius: 16px;
                    padding: 2rem 1.5rem;
                    min-width: 300px;
                    box-shadow: 0 8px 32px rgba(68,48,43,0.18);
                    text-align: center;
                    position: relative;
                ">
                    <button id="close-calendar-modal" style="
                        position: absolute;
                        top: 10px;
                        right: 16px;
                        background: transparent;
                        border: none;
                        font-size: 1.5rem;
                        color: #44302b;
                        cursor: pointer;
                    ">&times;</button>
                    <h2 style="margin-bottom:1.2rem;">Escolha data e horário</h2>
                    <input type="date" id="agendamento-data" style="margin-bottom:1rem; padding:0.5rem; border-radius:6px; border:1px solid #bba486; width: 80%;" min="${minDate}" value="${showToday ? todayStr : minDate}"><br>
                    <input type="time" id="agendamento-hora" style="margin-bottom:1.5rem; padding:0.5rem; border-radius:6px; border:1px solid #bba486; width: 80%;" min="08:00" max="19:59"><br>
                    <button id="confirmar-agendamento" style="
                        background: #bba486;
                        color: #44302b;
                        border: none;
                        border-radius: 6px;
                        padding: 0.7rem 2rem;
                        font-size: 1rem;
                        font-weight: bold;
                        cursor: pointer;
                        transition: background 0.2s;
                    ">Confirmar</button>
                </div>
            `;
            document.body.appendChild(modal);

            // Fechar modal
            document.getElementById('close-calendar-modal').onclick = () => modal.remove();

            // Confirmar agendamento
            document.getElementById('confirmar-agendamento').onclick = () => {
                const data = document.getElementById('agendamento-data').value;
                const hora = document.getElementById('agendamento-hora').value;
                if (data && hora) {
                    alert(`Agendamento realizado para ${data} às ${hora}.`);
                    modal.remove();
                } else {
                    alert('Por favor, selecione data e horário.');
                }
            };
        }
    });
});