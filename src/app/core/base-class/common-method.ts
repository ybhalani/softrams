export class CommonMethodBaseClass {
    alertType: String;
    alertMessage: String;
    constructor() { }

    /**
   * Show alerts base on type 
   * @param {string=['success', 'danger', 'warning', 'info']} type alert type of display message
   * @param {string} message message text for display
   */
    showAlert(type, message) {
        this.alertType = type;
        this.alertMessage = message;
    }

    hideAlert() {
        this.alertType = null;
        this.alertMessage = '';
    }
}
