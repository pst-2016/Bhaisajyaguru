// Generic paginated sutra reader.
// Expects window.SUTRA_DATA = { title, translator, pages: [{ heading, paragraphs: [] }] }
// and the reader DOM (see #sutra-reader markup in the scripture page).
document.addEventListener('DOMContentLoaded', function () {
    var data = window.SUTRA_DATA;
    var reader = document.getElementById('sutra-reader');
    if (!data || !reader) return;

    var headingEl = document.getElementById('sutra-page-heading');
    var bodyEl = document.getElementById('sutra-page-body');
    var indicatorEl = document.getElementById('sutra-indicator');
    var prevBtn = document.getElementById('sutra-prev');
    var nextBtn = document.getElementById('sutra-next');

    var current = 0;
    var total = data.pages.length;

    function render(scroll) {
        var page = data.pages[current];
        headingEl.textContent = page.heading || '';
        bodyEl.innerHTML = '';
        page.paragraphs.forEach(function (text) {
            var p = document.createElement('p');
            p.textContent = text;
            bodyEl.appendChild(p);
        });
        indicatorEl.textContent = (current + 1) + ' / ' + total;
        prevBtn.disabled = (current === 0);
        nextBtn.disabled = (current === total - 1);
        bodyEl.scrollTop = 0;
        if (scroll) {
            reader.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function go(delta) {
        var next = current + delta;
        if (next < 0 || next > total - 1) return;
        current = next;
        render(true);
    }

    prevBtn.addEventListener('click', function () { go(-1); });
    nextBtn.addEventListener('click', function () { go(1); });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') go(-1);
        if (e.key === 'ArrowRight') go(1);
    });

    render(false);
});
