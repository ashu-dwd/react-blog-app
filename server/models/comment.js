///schema for comments in sequalize
module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('Comments', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        CommentBody: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            default: 'Anonymous'
        },

        postId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    });
    return Comments;
}