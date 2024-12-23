import { z } from "zod"

export enum Weapon {
    AirStrike = "p09",
    BGM = "p11",
    TankLvl1 = "p52",
    APCLvl1 = "p53",
    HeliLvl1 = "p54",
    TankLvl2 = "p55",
    APCLvl2 = "p56",
    HeliLvl2 = "p57",
    TankLvl3 = "p58",
    APCLvl3 = "p59",
    HeliLvl3 = "p60",
    ARRifle = "p61",
    AKRifle = "p62",
    Pistol = "p63",
    HuntingRifle = "p64",
    RPG = "p65",
    Shotgun = "p66",
    SniperRifle = "p67",
    SMG = "p68",
    Homing = "p69",
    Grenade = "p71",
    HeliMinigun = "p74",
    TankMinigun = "p75",
    Knife = "p76",
    Revolver = "p78",
    Minigun = "p79",
    GrenadeLauncher = "p80",
    SmokeGrenade = "p81",
    Jet1Rockets = "p82",
    Jet1Homing = "p83",
    Jet1MachineGun = "p84",
    Jet2Rockets = "p85",
    Jet2Homing = "p86",
    Jet2MachineGun = "p87",
    Fists = "p88",
    VSS = "p89",
    FiftyCalSniper = "p90",
    MGTurret = "p91",
    Crossbow = "p92",
    SCAR = "p93",
    TacticalShotgun = "p94",
    VEK = "p95",
    Desert = "p96",
    Auto = "p97",
    LMG = "p98",
    UNRELEASED_WEAPON_99 = "p99",
    Mace = "p100",
    RubberChicken = "p101",
    Butterfly = "p102",
    Chainsaw = "p103",
    AKSMG = "p104",
    AutoSniper = "p105",
    UnreleasedAR = "p106",
    UnreleasedSawedOff = "p107",
    HealingPistol = "p108",
    UnreleasedMP7 = "p109",
    ImplosionGrenade = "p110",
    LaserTripMine = "p111",
    ConcussionGrenade = "p112",
    G3A3 = "p126",
}

export const weaponIDSchema = z.nativeEnum(Weapon)

export const WeaponName: { [key in Weapon]: string } = {
    [Weapon.AirStrike]: "Air Strike",
    [Weapon.BGM]: "BGM",
    [Weapon.TankLvl1]: "Tank Lvl 1",
    [Weapon.APCLvl1]: "APC Lvl 1",
    [Weapon.HeliLvl1]: "Heli Lvl 1",
    [Weapon.TankLvl2]: "Tank Lvl 2",
    [Weapon.APCLvl2]: "APC Lvl 2",
    [Weapon.HeliLvl2]: "Heli Lvl 2",
    [Weapon.TankLvl3]: "Tank Lvl 3",
    [Weapon.APCLvl3]: "APC Lvl 3",
    [Weapon.HeliLvl3]: "Heli Lvl 3",
    [Weapon.ARRifle]: "AR Rifle",
    [Weapon.AKRifle]: "AK Rifle",
    [Weapon.Pistol]: "Pistol",
    [Weapon.HuntingRifle]: "Hunting",
    [Weapon.RPG]: "RPG",
    [Weapon.Shotgun]: "Shotgun",
    [Weapon.SniperRifle]: "Sniper",
    [Weapon.SMG]: "SMG",
    [Weapon.Homing]: "Homing",
    [Weapon.Grenade]: "Grenade",
    [Weapon.HeliMinigun]: "Heli Minigun",
    [Weapon.TankMinigun]: "Tank Minigun",
    [Weapon.Knife]: "Knife",
    [Weapon.Revolver]: "Revolver",
    [Weapon.Minigun]: "Minigun",
    [Weapon.GrenadeLauncher]: "G. Launcher",
    [Weapon.SmokeGrenade]: "Smoke Grenade",
    [Weapon.Jet1Rockets]: "Jet 1 Rockets",
    [Weapon.Jet1Homing]: "Jet 1 Homing",
    [Weapon.Jet1MachineGun]: "Jet 1 Machine Gun",
    [Weapon.Jet2Rockets]: "Jet 2 Rockets",
    [Weapon.Jet2Homing]: "Jet 2 Homing",
    [Weapon.Jet2MachineGun]: "Jet 2 Machine Gun",
    [Weapon.Fists]: "Fists",
    [Weapon.VSS]: "VSS",
    [Weapon.FiftyCalSniper]: ".50 Cal Sniper",
    [Weapon.MGTurret]: "MG Turret",
    [Weapon.Crossbow]: "Crossbow",
    [Weapon.SCAR]: "SCAR",
    [Weapon.TacticalShotgun]: "Tactical Shotgun",
    [Weapon.VEK]: "VEK",
    [Weapon.Desert]: "Desert",
    [Weapon.Auto]: "Auto Pistol",
    [Weapon.LMG]: "LMG",
    [Weapon.UNRELEASED_WEAPON_99]: "UNRELEASED WEAPON 99",
    [Weapon.Mace]: "Mace",
    [Weapon.RubberChicken]: "Rubber Chicken",
    [Weapon.Butterfly]: "Butterfly",
    [Weapon.Chainsaw]: "Chainsaw",
    [Weapon.AKSMG]: "AK SMG",
    [Weapon.AutoSniper]: "Auto Sniper",
    [Weapon.UnreleasedAR]: "Unreleased AR",
    [Weapon.UnreleasedSawedOff]: "Unreleased Sawed Off",
    [Weapon.HealingPistol]: "Healing Pistol",
    [Weapon.UnreleasedMP7]: "Unreleased MP7",
    [Weapon.ImplosionGrenade]: "Implosion Grenade",
    [Weapon.LaserTripMine]: "Laser Trip Mine",
    [Weapon.ConcussionGrenade]: "Concussion Grenade",
    [Weapon.G3A3]: "G3A3",
}
