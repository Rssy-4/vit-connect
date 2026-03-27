
function toggleAnswer(element) {
    var answer = element.nextElementSibling;
    answer.classList.toggle('show');

    var icon = element.querySelector('.plus-icon');
    icon.classList.toggle('rotated');
}

function submitQuestion() {
    var name = document.getElementById('faqName').value.trim();
    var regno = document.getElementById('faqRegno').value.trim();
    var question = document.getElementById('faqQuestion').value.trim();

    var errorMsgs = document.querySelectorAll('.error-msg');

    for (var i = 0; i < errorMsgs.length; i++) {
        errorMsgs[i].style.display = 'none';
    }

    document.getElementById('thankYouMessage').style.display = 'none';

    var namePattern = /^[A-Za-z ]{2,50}$/;
    if (!namePattern.test(name)) {
        document.getElementById('faqNameError').style.display = 'block';
        document.getElementById('faqName').focus();
        return;
    }

    var regPattern = /^[0-9]{2}[A-Z]{3}[0-9]{4}$/;
    if (!regPattern.test(regno)) {
        document.getElementById('faqRegnoError').style.display = 'block';
        document.getElementById('faqRegno').focus();
        return;
    }

    if (question.length < 10) {
        document.getElementById('faqQuestionError').style.display = 'block';
        document.getElementById('faqQuestion').focus();
        return;
    }

    fetch('https://script.google.com/macros/s/AKfycbwkjS7_CPDBPnXOZdf2WZ-pG7Xf1-iGWBfA9u4QTvuGBmBLMVU0y0oOoE_JP1cQ2dkD2A/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            formType: 'faq',
            name: name,
            regno: regno,
            question: question
        })
    });

    document.getElementById('thankYouMessage').style.display = 'block';

    document.getElementById('questionForm').reset();
}

document.addEventListener('DOMContentLoaded', function() {
    var faqItems = document.querySelectorAll('.faq-item');

    var index = 0;
    while (index < faqItems.length) {
        faqItems[index].addEventListener('mouseover', function() {
            this.style.borderColor = '#0d6efd';
        });

        faqItems[index].addEventListener('mouseout', function() {
            this.style.borderColor = '#ccc';
        });

        index = index + 1;
    }
});
