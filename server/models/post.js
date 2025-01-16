module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define('Posts', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
            // references: {
            //     model: 'Users',
            //     key: 'id'
            // }
        }
    });
    return Posts;
}