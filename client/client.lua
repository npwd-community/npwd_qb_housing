local QBCore = exports['qb-core']:GetCoreObject()

RegisterNUICallback("npwd:qb-housing:getPlayerHouses", function(_, cb)
	TriggerServerEvent("npwd:qb-housing:getPlayerHouses")
	RegisterNetEvent("npwd:qb-housing:sendPlayerHouses", function(data)
		cb({ status = "ok", data = data })
	end)
end)

RegisterNUICallback("npwd:qb-housing:getPlayerKeys", function(_, cb)
	TriggerServerEvent("npwd:qb-housing:getPlayerKeys")
	RegisterNetEvent("npwd:qb-housing:sendPlayerKeys", function(data)
		cb({ status = "ok", data = data })
	end)
end)

RegisterNUICallback("npwd:qb-housing:transferHouse", function(data, cb)
	QBCore.Functions.TriggerCallback('qb-phone:server:TransferCid', function(CanTransfer)
		if CanTransfer then
			cb({ status = "ok"})
		else
			cb({ status = "error", message = "You can't transfer your house at this time."})
		end
    end, data.citizenid, data.house)
end)

RegisterNUICallback("npwd:qb-housing:removeKeyHolder", function(data, cb)
    TriggerServerEvent('qb-houses:server:removeHouseKey', data.house, {
        citizenid = data.HolderData.citizenid,
        firstname = data.HolderData.firstname,
        lastname = data.HolderData.lastname,
    })
    cb({status = "ok"})
end)

RegisterNUICallback("npwd:qb-housing:setWaypoint", function(data, cb)
	SetNewWaypoint(data.coords.x, data.coords.y)
	cb({status = "ok"})
end)




