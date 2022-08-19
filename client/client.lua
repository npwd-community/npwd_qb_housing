local QBCore = exports['qb-core']:GetCoreObject()

RegisterNUICallback("npwd:qb-housing:getPlayerHouses", function(_, cb)
	TriggerServerEvent("npwd:qb-housing:getPlayerHouses")
	RegisterNetEvent("npwd:qb-housing:sendPlayerHouses", function(data)

		printTable(data)

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

function printTable(tbl, indent)
	if not indent then indent = 0 end
	for k, v in pairs(tbl) do
	  formatting = string.rep("  ", indent) .. k .. ": "
	  if type(v) == "table" then
		print(formatting)
		printTable(v, indent+1)
	  elseif type(v) == 'boolean' then
		print(formatting .. tostring(v))
	  else
		print(formatting .. v)
	  end
	end
  end
  



