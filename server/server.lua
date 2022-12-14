local QBCore = exports["qb-core"]:GetCoreObject()

RegisterNetEvent("npwd:qb-housing:getPlayerHouses", function()
	local src = source
	local Player = QBCore.Functions.GetPlayer(src)
	local playerHouses = MySQL.query.await(
		"SELECT player_houses.id, player_houses.house, player_houses.keyholders, houselocations.label, houselocations.garage, houselocations.tier, houselocations.coords FROM player_houses LEFT JOIN houselocations ON player_houses.house = houselocations.name WHERE player_houses.citizenid = ?",
		{ Player.PlayerData.citizenid }
	)
	if playerHouses then
		for i = 1, #playerHouses do
			local keyHolders = json.decode(playerHouses[i].keyholders)
			playerHouses[i].garage = json.decode(playerHouses[i].garage)
			playerHouses[i].coords = json.decode(playerHouses[i].coords)
			for a = 1, #keyHolders do
				local keyHolderData = MySQL.query.await(
					"SELECT charinfo FROM players where citizenid = ?",
					{ keyHolders[a] }
				)
				if keyHolderData[1] then
					local charinfo = json.decode(keyHolderData[1].charinfo)
					local name = charinfo.firstname .. " " .. charinfo.lastname
					keyHolders[a] = {
						citizenid = keyHolders[a],
						name = name,
					}
				end
			end
			playerHouses[i].keyholders = keyHolders
		end
	end
	TriggerClientEvent("npwd:qb-housing:sendPlayerHouses", src, playerHouses)
end)

RegisterNetEvent("npwd:qb-housing:getPlayerKeys", function()
	local src = source
	local Player = QBCore.Functions.GetPlayer(src)
	local keys = exports["qb-houses"]:getKeyHolderData()
	local houses = {}
	for k, v in pairs(keys) do
		for i = 1, #v do
			if v[i] == Player.PlayerData.citizenid then
				local houseInfo = MySQL.query.await("SELECT coords, label FROM houselocations where name = ?", { k })
				table.insert(houses, {
					label = houseInfo[1].label,
					coords = json.decode(houseInfo[1].coords),
				})
			end
		end
	end
	TriggerClientEvent("npwd:qb-housing:sendPlayerKeys", src, houses)
end)
