
// 获取所有元素
const form = document.querySelector('.form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirm_pwd = document.querySelector('#confirm_psd');

// 设置错误信息
function showErrorMsg(input, msg) {
    let formControl = input.parentElement;
    // 这里要使用 className 而不是 classList 因为需要覆盖 success
    formControl.className = 'form_control error';
    let small = formControl.querySelector('small');
    small.innerText = msg;
}

// 设置成功状态
function showSuccess(input) {
    let formControl = input.parentElement;
    formControl.className = 'form_control success';
}

// 检测 email
function checkEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email.value.trim())) {
        showSuccess(email);
    } else {
        showErrorMsg(email, 'Email is not right');
    }
}

// 检查空
function checkRequired(inputArr) {
    inputArr.forEach(input => {
        if (input.value.trim() === '') {
            showErrorMsg(input, `${getInputName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

// 检查长度
function checkLength(input, min, max) {
    if (input.value.trim().length < min) {
        showErrorMsg(input, `can not less than ${min}`);
    } else if (input.value.trim().length > max) {
        showErrorMsg(input, `can not more than ${max}`);
    } else {
        showSuccess(input);
    }
}

// 密码匹配
function checkPasswordMatch(password, confirm_pwd) {
    if (password.value !== confirm_pwd.value) {
        showErrorMsg(confirm_pwd, 'password is not match');
    }
}

// 获取输入的id首字母 charAt(0) 转成大写，拼接上 从 1 开始往后的所有字符
function getInputName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// 监听提交事件
form.addEventListener('submit', (e) => {
    // 阻止默认事件
    e.preventDefault();

    checkRequired([username, email, password, confirm_pwd])
    checkLength(username, 4, 7);
    checkLength(password, 4, 8);
    checkEmail(email);
    checkPasswordMatch(password, confirm_pwd);
});