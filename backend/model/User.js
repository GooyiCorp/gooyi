import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const User = sequelize.define('User', {
    user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
    },
    first_name: {
    type: DataTypes.TEXT
    },
    last_name: {
    type: DataTypes.TEXT
    },
    email: {
    type: DataTypes.TEXT
    },
    phone: {
    type: DataTypes.TEXT
    },
    active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
    }
}, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default User
