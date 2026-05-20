const orderService = require("../services/orderService");

let intervalId = null;

const startOrderJobs = () => {
    if (intervalId) return;
    // run every minute
    intervalId = setInterval(async () => {
        try {
            const res = await orderService.autoConfirmOldOrders();
            if (res && res.nModified && res.nModified > 0) {
                console.log(`Auto-confirmed ${res.nModified} orders`);
            }
        } catch (error) {
            console.error("Order job error:", error.message);
        }
    }, 60 * 1000);
    console.log("Order jobs started");
};

module.exports = { startOrderJobs };
