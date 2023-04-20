import { DataTypes } from 'sequelize';

import { USER_ROLE } from '../constants';
import sequelize from '../db';
import {
  IUser,
  IUserAttributes,
  IDevice,
  IDeviceAttributes,
  IDeviceInfo,
  IDeviceInfoAttributes,
  ICart,
  ICartAttributes,
  ICartDevice,
  ICartDeviceAttributes,
  IType,
  ITypeAttributes,
  IBrand,
  IBrandAttributes,
  IRating,
  IRatingAttributes,
  ITypeBrand,
  ITypeBrandAttributes,
} from './types';

const User = sequelize.define<IUser, IUserAttributes>('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: USER_ROLE.USER },
});

const Cart = sequelize.define<ICart, ICartAttributes>('cart', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const CartDevice = sequelize.define<ICartDevice, ICartDeviceAttributes>('cart_device', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Device = sequelize.define<IDevice, IDeviceAttributes>('device', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define<IType, ITypeAttributes>('type', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Brand = sequelize.define<IBrand, IBrandAttributes>('brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Rating = sequelize.define<IRating, IRatingAttributes>('rating', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});

const DeviceInfo = sequelize.define<IDeviceInfo, IDeviceInfoAttributes>('device_info', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

const TypeBrand = sequelize.define<ITypeBrand, ITypeBrandAttributes>('type_brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Cart.hasMany(Device);
Device.belongsTo(Cart); // TODO: remove ?

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(CartDevice);
CartDevice.belongsTo(Device);

Device.hasMany(DeviceInfo, { as: 'info' });
DeviceInfo.belongsTo(Device);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

export { User, Cart, CartDevice, Device, Type, Brand, Rating, TypeBrand, DeviceInfo };
