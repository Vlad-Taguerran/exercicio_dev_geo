"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const UserModel_1 = require("./UserModel");
const uuid_1 = require("uuid");
let AddressModel = class AddressModel extends sequelize_typescript_1.Model {
};
exports.AddressModel = AddressModel;
__decorate([
    (0, sequelize_typescript_1.Default)(sequelize_typescript_1.DataType.UUIDV4),
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, defaultValue: (0, uuid_1.v4)() }),
    __metadata("design:type", String)
], AddressModel.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => UserModel_1.UserModel),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: false }),
    __metadata("design:type", String)
], AddressModel.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => UserModel_1.UserModel),
    __metadata("design:type", UserModel_1.UserModel)
], AddressModel.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: true }),
    __metadata("design:type", String)
], AddressModel.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: true }),
    __metadata("design:type", String)
], AddressModel.prototype, "house_number", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: true }),
    __metadata("design:type", String)
], AddressModel.prototype, "city", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: true }),
    __metadata("design:type", String)
], AddressModel.prototype, "state", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: true }),
    __metadata("design:type", String)
], AddressModel.prototype, "postcode", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: true }),
    __metadata("design:type", String)
], AddressModel.prototype, "notes", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.GEOMETRY('POINT'), allowNull: false }),
    __metadata("design:type", Object)
], AddressModel.prototype, "location", void 0);
exports.AddressModel = AddressModel = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'addresses', timestamps: true })
], AddressModel);
