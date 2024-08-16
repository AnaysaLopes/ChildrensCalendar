document.addEventListener('DOMContentLoaded', () => {
    const calendarAugust = document.getElementById('calendar-august');
    const calendarSeptember = document.getElementById('calendar-september');
    const calendarOctober = document.getElementById('calendar-october');

    function createCalendar(container, startDate, endDate) {
        container.innerHTML = '';

        const firstDayOfMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
        const firstDayOfWeek = firstDayOfMonth.getDay();
        for (let i = 0; i < firstDayOfWeek; i++) {
            const emptyElement = document.createElement('div');
            emptyElement.className = 'day empty';
            container.appendChild(emptyElement);
        }

        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day';
            dayElement.textContent = currentDate.getDate();
            dayElement.dataset.date = currentDate.toISOString();

            container.appendChild(dayElement);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        const lastDayOfMonth = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0);
        const lastDayOfWeek = lastDayOfMonth.getDay();
        const totalDays = container.childElementCount;
        const totalCells = 7 * Math.ceil(totalDays / 7);
        const daysToAdd = totalCells - totalDays;
        for (let i = 0; i < daysToAdd; i++) {
            const emptyElement = document.createElement('div');
            emptyElement.className = 'day empty';
            container.appendChild(emptyElement);
        }
    }

    const startDateAugust = new Date('2024-08-01T00:00:00-03:00');
    const endDateAugust = new Date('2024-08-31T23:59:59-03:00');

    const startDateSeptember = new Date('2024-09-01T00:00:00-03:00');
    const endDateSeptember = new Date('2024-09-30T23:59:59-03:00');

    const startDateOctober = new Date('2024-10-01T00:00:00-03:00');
    const endDateOctober = new Date('2024-10-31T23:59:59-03:00');

    createCalendar(calendarAugust, startDateAugust, endDateAugust);
    createCalendar(calendarSeptember, startDateSeptember, endDateSeptember);
    createCalendar(calendarOctober, startDateOctober, endDateOctober);

    function markDaysSinceStart() {
        const allDays = document.querySelectorAll('.day');
        const startCheckDate = new Date('2024-08-15T00:00:00-03:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        allDays.forEach(dayElement => {
            const dayDate = new Date(dayElement.dataset.date);
            dayDate.setHours(0, 0, 0, 0);

            if (dayDate < today && dayDate >= startCheckDate && !(dayDate.getMonth() === 9 && dayDate.getDate() === 15)) {
                dayElement.classList.add('checkout');
            } else if (dayDate.getTime() === today.getTime()) {
                dayElement.classList.add('checked');
            }
        });
    }

    function markSpecialDays() {
        const allDays = document.querySelectorAll('.day');
        allDays.forEach(dayElement => {
            const dayDate = new Date(dayElement.dataset.date);
            if (dayDate.getMonth() === 9) {
                if (dayDate.getDate() === 13) {
                    dayElement.classList.add('special-day-13');
                    dayElement.style.backgroundImage = "url('images/casaleide.svg')";
                    dayElement.style.backgroundSize = "cover";
                    dayElement.style.backgroundPosition = "center";
                } else if (dayDate.getDate() === 16) {
                    dayElement.classList.add('special-day-16');
                }
            }
        });
    }

    markDaysSinceStart();
    markSpecialDays();

    function scheduleDailyCheck() {
        const now = new Date();
        const targetHour = 6;
        const nextCheckTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), targetHour, 0, 0, 0);
        if (now > nextCheckTime) {
            nextCheckTime.setDate(nextCheckTime.getDate() + 1);
        }
        const millisecondsUntilNextCheck = nextCheckTime - now;

        setTimeout(() => {
            markDaysSinceStart();
            markSpecialDays();
            setInterval(() => {
                markDaysSinceStart();
                markSpecialDays();
            }, 24 * 60 * 60 * 1000);
        }, millisecondsUntilNextCheck);
    }

    scheduleDailyCheck();
});
