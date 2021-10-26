getEmailFormData = function() {
	// abstract this function further
	const form = document.getElementById('email'),
	data = new FormData(form);
	return (data.get('email') ? data : false);
}

formatNotification = function(data) {
	// format the form data.
	let email = {};
	email['sender'] = data.get('email');
	email['subject'] = email['sender']+" wants to talk about hiring you.";
	email['body'] = email['sender']+"  has sent you their email address on <current date and time> and would like to set up a time to chat with you.";

	return email;
	}

getAndFormatEmail = function() {
	const data = getEmailFormData();
	let email;

	if (data) {
		return email = formatNotification(data);
		}
}

addWaitingAnimation = function(input) {
	input.classList.add('pulse','waiting');
}

removeWaitingAnimation = function(input) {
	input.classList.remove('pulse','waiting');
}

addSuccessBreadcrumb = function(input) {
	input.classList.add('success');
}

removeSuccessBreadcrumb = function(input) {
	input.classList.remove('success');
}

addErrorBreadcrumb = function(input) {
	input.classList.add('error');
}

removeErrorBreadcrumb = function(input) {
	input.classList.remove('error');
}

getEmailInput = function() {
	return document.querySelector('#email input');
}

msgHandler = function(message, input) {
	removeWaitingAnimation(input);
	if(  message != "OK" ) {
			addErrorBreadcrumb(input);
			alert(message);
			return;
		}
	if(input.classList.contains('error')) {
			removeErrorBreadcrumb(input);
		}
	addSuccessBreadcrumb(input);
}

sendEmail = function(email={},btn) {
	addWaitingAnimation(btn);
	Email.send({
		SecureToken: "9bc48b97-64de-45cf-a431-8fc54086798b",
		To: "hector@hectordiaz.pro",
		From: "hector@hectordiaz.pro",
		Subject: email.subject,
		Body: email.body
	}).then (
		message => {
			msgHandler(message, btn)
		}
	);
}

emailFormActions = function(email={}) {
	const submitBtn = document.querySelector('#email button');

	submitBtn.addEventListener('click', (event)=>{
		event.stopImmediatePropagation();
		event.preventDefault();
		email = getAndFormatEmail();
		sendEmail(email, submitBtn) });
}

emailFormActions();
//-const input = getEmailInput();
//-addWaitingAnimation(input);
