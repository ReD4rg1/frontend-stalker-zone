import axios from "axios";
import {getToken} from "../token";
import {weaponsNames} from "../../consts/multiplayerSession";

export interface Shop {
    armors: ArmorType[]
    weapon: WeaponType[]
    weaponModifiers: WeaponModifierType[]
    equipments: EquipmentsType[]
    grenade: GrenadeType[]
}

interface GrenadeType {
    id: number
    name: string
    damage: number
    damageBoost: number
    description: string
    place: string
    price: number
}

interface ArmorType {
    id: number
    name: string
    defense: number
    type: ItemTypes
    place: string
    price: number
}

interface WeaponType {
    id: number
    name: weaponsNames
    damage: number
    damageBoost: number
    description: string
    place: string
    price: number
}

interface WeaponModifierType {
    id: number
    name: string
    weaponName: weaponsNames
    damageModifier: number
    type: ItemTypes
    place: string
    price: number
}

interface EquipmentsType {
    id: number
    name: string
    effect: string
    effectValue: number
    type: ItemTypes
    place: string
    price: number
}

export type ItemTypes = 'Голова' | 'Корпус' | 'weapon' | 'firstModifier'
    | 'secondModifier' | 'thirdModifier' | 'artifact' | 'trapModifier' | 'stealthModifier'
    | 'mapModifier' | 'locationModifier' | 'teleport' | 'grenade' | 'medkit' | 'stimulator' | 'trophy'

const token = getToken()

const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {'Authorization': `${token}`}
})

const inventoryAPI = {

    getShop() {
        return (
            instance.get(`/items/get`)
                .then((response): Shop => response.data)
        )
    },

    setItem(playerId: number, itemId: number, price: number, type: ItemTypes) {
        return (
            instance.post(`/inventory/set?playerId=${playerId}&itemId=${itemId}&price=${price}&type=${type}`, {})
                .then((response) => response.data)
        )
    },

    setFromBackpackItem(playerId: number, itemId: number, type: ItemTypes) {
        return (
            instance.post(`/backpack/set?playerId=${playerId}&itemId=${itemId}&type=${type}`, {})
                .then((response) => response.data)
        )
    },

    removeItem(playerId: number, itemId: number, price: number,type: ItemTypes) {
        return (
            instance.post(`/inventory/remove?playerId=${playerId}&itemId=${itemId}&price=${price}&type=${type}`, {})
                .then((response) => response.data)
        )
    },

    sellItem(playerId: number, itemId: number, price: number, type: ItemTypes) {
        return (
            instance.post(`/inventory/sell?playerId=${playerId}&itemId=${itemId}&price=${price}&type=${type}`, {})
                .then((response) => response.data)
        )
    },

    useMedkit(playerId: number, medkitId: number) {
        return (
            instance.post(`/items/use-medkit?playerId=${playerId}&medkitId=${medkitId}`, {})
                .then((response) => response.data)
        )
    },

    useStimulator(playerId: number, stimulatorId: number) {
        return (
            instance.post(`/items/use-stimulator?playerId=${playerId}&stimulatorId=${stimulatorId}`, {})
                .then((response) => response.data)
        )
    },

    useGrenade(playerId: number, grenadeId: number) {
        return (
            instance.post(`/items/use-grenade?playerId=${playerId}&grenadeId=${grenadeId}`, {})
                .then((response) => response.data)
        )
    },
}

export default inventoryAPI
