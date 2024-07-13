module.exports = {
	config: {
		name: "onlyadminbox",
		aliases: ["onlyadbox", "adboxonly", "adminboxonly"],
		version: "1.3",
		author: "NTKhang",
		countDown: 5,
		role: 1,
		description: {
			vi: "bật/tắt chế độ chỉ quản trị của viên nhóm mới có thể sử dụng bot",
			en: "turn on/off only admin box can use bot"
		},
		category: "box chat",
		guide: {
			vi: "   {pn} [on | off]: bật/tắt chế độ chỉ quản trị viên nhóm mới có thể sử dụng bot"
				+ "\n   {pn} noti [on | off]: bật/tắt thông báo khi người dùng không phải là quản trị viên nhóm sử dụng bot",
			en: "   {pn} [on | off]: turn on/off the mode only admin of group can use bot"
				+ "\n   {pn} noti [on | off]: turn on/off the notification when user is not admin of group use bot"
		}
	},

	langs: {
		vi: {
			turnedOn: "Đã bật chế độ chỉ quản trị viên nhóm mới có thể sử dụng bot",
			turnedOff: "Đã tắt chế độ chỉ quản trị viên nhóm mới có thể sử dụng bot",
			turnedOnNoti: "Đã bật thông báo khi người dùng không phải là quản trị viên nhóm sử dụng bot",
			turnedOffNoti: "Đã tắt thông báo khi người dùng không phải là quản trị viên nhóm sử dụng bot",
			syntaxError: "Sai cú pháp, chỉ có thể dùng {pn} on hoặc {pn} off"
		},
		en: {
			turnedOn: "𝒂𝒄𝒕𝒊𝒗𝒆 𝒍𝒆 𝒎𝒐𝒅𝒆, 𝒔𝒆𝒖𝒍 𝒍'𝒂𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒂𝒕𝒆𝒖𝒓 𝒅𝒖 𝒈𝒓𝒐𝒖𝒑𝒆 𝒑𝒆𝒖𝒕 𝒖𝒕𝒊𝒍𝒊𝒔𝒆𝒓 𝒍𝒆 𝒃𝒐𝒕",
			turnedOff: "𝒅𝒆𝒔𝒂𝒄𝒕𝒊𝒗𝒆 𝒍𝒆 𝒎𝒐𝒅𝒆, 𝒔𝒆𝒖𝒍 𝒍'𝒂𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒂𝒕𝒆𝒖𝒓 𝒅𝒖 𝒈𝒓𝒐𝒖𝒑𝒆 𝒑𝒆𝒖𝒕 𝒖𝒕𝒊𝒍𝒊𝒔𝒆𝒓 𝒍𝒆 𝒃𝒐𝒕",
			turnedOnNoti: "𝒂𝒄𝒕𝒊𝒗𝒆𝒛 𝒍𝒂 𝒏𝒐𝒕𝒊𝒇𝒊𝒄𝒂𝒕𝒊𝒐𝒏 𝒍𝒐𝒓𝒔𝒒𝒖𝒆 𝒍'𝒖𝒕𝒊𝒍𝒊𝒔𝒂𝒕𝒆𝒖𝒓 𝒏'𝒆𝒔𝒕 𝒑𝒂𝒔 𝒂𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒂𝒕𝒆𝒖𝒓 𝒅𝒖 𝒃𝒐𝒕 𝒅'𝒖𝒕𝒊𝒍𝒊𝒔𝒂𝒕𝒆𝒖𝒓 𝒅𝒖 𝒈𝒓𝒐𝒖𝒑𝒆 ",
			turnedOffNoti: "𝒅𝒆𝒔𝒂𝒄𝒕𝒊𝒗𝒂𝒕𝒊𝒐𝒏 𝒅𝒆 𝒍𝒂 𝒏𝒐𝒕𝒊𝒇𝒊𝒄𝒂𝒕𝒊𝒐𝒏 𝒍𝒐𝒓𝒔𝒒𝒖𝒆 𝒍'𝒖𝒕𝒊𝒍𝒊𝒔𝒂𝒕𝒆𝒖𝒓 𝒏'𝒆𝒔𝒕 𝒑𝒂𝒔 𝒂𝒅𝒎𝒊𝒏𝒊𝒔𝒕𝒂𝒕𝒆𝒖𝒓 𝒅𝒖 𝒃𝒐𝒕 𝒅'𝒖𝒕𝒊𝒍𝒊𝒔𝒂𝒕𝒆𝒖𝒓 𝒅𝒖 𝒈𝒓𝒐𝒖𝒑𝒆",
			syntaxError: "𝑬𝒓𝒓𝒆𝒖𝒓 𝒅𝒆 𝒔𝒚𝒏𝒕𝒂𝒙𝒆,𝒖𝒕𝒊𝒍𝒊𝒔𝒆𝒛 𝒖𝒏𝒊𝒒𝒖𝒆𝒎𝒆𝒏𝒕 {𝒑𝒏} 𝒐𝒏 𝒐𝒖 {𝒑𝒏} 𝒐𝒇𝒇"
		}
	},

	onStart: async function ({ args, message, event, threadsData, getLang }) {
		let isSetNoti = false;
		let value;
		let keySetData = "data.onlyAdminBox";
		let indexGetVal = 0;

		if (args[0] == "noti") {
			isSetNoti = true;
			indexGetVal = 1;
			keySetData = "data.hideNotiMessageOnlyAdminBox";
		}

		if (args[indexGetVal] == "on")
			value = true;
		else if (args[indexGetVal] == "off")
			value = false;
		else
			return message.reply(getLang("syntaxError"));

		await threadsData.set(event.threadID, isSetNoti ? !value : value, keySetData);

		if (isSetNoti)
			return message.reply(value ? getLang("turnedOnNoti") : getLang("turnedOffNoti"));
		else
			return message.reply(value ? getLang("turnedOn") : getLang("turnedOff"));
	}
};
