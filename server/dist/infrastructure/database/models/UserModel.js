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
exports.UserModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const AddressModel_1 = require("./AddressModel");
const uuid_1 = require("uuid");
let UserModel = class UserModel extends sequelize_typescript_1.Model {
};
exports.UserModel = UserModel;
__decorate([
    (0, sequelize_typescript_1.Default)(sequelize_typescript_1.DataType.UUIDV4),
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, defaultValue: (0, uuid_1.v4)() }),
    __metadata("design:type", String)
], UserModel.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], UserModel.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], UserModel.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], UserModel.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => AddressModel_1.AddressModel),
    __metadata("design:type", Array)
], UserModel.prototype, "addresses", void 0);
exports.UserModel = UserModel = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'users', timestamps: true })
], UserModel);
