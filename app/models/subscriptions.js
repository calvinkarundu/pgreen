const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite'
});

const Subscription = sequelize.define('Subscription',
    {
        pgId: {type: DataTypes.STRING, allowNull: false},
        orderId: {type: DataTypes.STRING, allowNull: false},
        amount: {type: DataTypes.INTEGER, allowNull: false},
        currency: {type: DataTypes.STRING, allowNull: false},
        type: {type: DataTypes.STRING, allowNull: false},
        paymentType: {type: DataTypes.STRING, allowNull: false},
        url: {type: DataTypes.STRING, allowNull: false},
        status: {type: DataTypes.STRING, allowNull: false},
        orderCycle: {type: DataTypes.INTEGER, allowNull: false},
        orderCount: {type: DataTypes.INTEGER, allowNull: false},
        orderDay: {type: DataTypes.INTEGER, allowNull: false},
        orderStartedAt: {type: DataTypes.STRING, allowNull: false},
        orderFirstAmount: {type: DataTypes.INTEGER, allowNull: false},
        createdAt: {type: DataTypes.STRING, allowNull: false},
        valueAt: {type: DataTypes.STRING, allowNull: false},
        answeredAt: {type: DataTypes.STRING, allowNull: false},
        userId: {type: DataTypes.INTEGER, allowNull: false},
    },
    {}
);

async function createSubscriptionFromResponse(data) {
    let sub;
    try {
        sub = await Subscription.create({
            pgId: data.id,
            orderId: data.orderId,
            amount: data.amount,
            currency: data.currency,
            type: data.type,
            paymentType: data.paymentType,
            url: data.url,
            status: data.result.status,
            orderCycle: data.orderDetails.cycle,
            orderCount: data.orderDetails.count,
            orderDay: data.orderDetails.day,
            orderStartedAt: data.orderDetails.startAt,
            orderFirstAmount: data.orderDetails.firstAmount,
            createdAt: data.createdAt,
            valueAt: data.valueAt,
            answeredAt: data.answeredAt,
            userId: data.buyer.id,
        })
    } catch (e) {
        throw e;
    }
    return sub;
}

module.exports = {createSubscriptionFromResponse, Subscription};
