"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressRepository = void 0;
const AddressModel_1 = require("../models/AddressModel");
const sequelize_1 = require("../sequelize");
const AddressMapper_1 = require("../../../application/mappers/AddressMapper");
class AddressRepository {
    create(address, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield sequelize_1.sequelize.transaction();
            const { lat, long } = address, data = __rest(address, ["lat", "long"]);
            try {
                const addres = yield AddressModel_1.AddressModel.create(Object.assign(Object.assign({}, data), { location: {
                        type: "Point",
                        coordinates: [parseFloat(long), parseFloat(lat)],
                    }, user: user, userId: user.id }), { transaction });
                yield transaction.commit();
                return AddressMapper_1.AddressMapper.toDomain(addres);
            }
            catch (error) {
                console.log(error);
                yield transaction.rollback();
                throw new Error(`Erro ao criar endereço: ${error.message}`);
            }
        });
    }
    findAll() {
        throw new Error("Method not implemented.");
    }
}
exports.AddressRepository = AddressRepository;
