const { findUid } = global.utils;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
	config: {
		name: "adduser",
		version: "1.5",
		author: "NTKhang",
		countDown: 5,
		role: 1,
		description: {
			vi: "Thêm thành viên vào box chat của bạn",
			en: "Add user to box chat of you"
		},
		category: "box chat",
		guide: {
			en: "   {pn} [link profile | uid]"
		}
	},

	langs: {
		vi: {
			alreadyInGroup: "Đã có trong nhóm",
			successAdd: "- Đã thêm thành công %1 thành viên vào nhóm",
			failedAdd: "- Không thể thêm %1 thành viên vào nhóm",
			approve: "- Đã thêm %1 thành viên vào danh sách phê duyệt",
			invalidLink: "Vui lòng nhập link facebook hợp lệ",
			cannotGetUid: "Không thể lấy được uid của người dùng này",
			linkNotExist: "Profile url này không tồn tại",
			cannotAddUser: "Bot bị chặn tính năng hoặc người dùng này chặn người lạ thêm vào nhóm"
		},
		en: {
			alreadyInGroup: "𝒅𝒆𝒋𝒂 𝒂𝒖 𝒈𝒓𝒐𝒖𝒑𝒆",
			successAdd: "- %1 𝒎𝒆𝒎𝒃𝒓𝒆𝒔 𝒐𝒏𝒕 𝒆𝒕𝒆 𝒂𝒋𝒐𝒖𝒕𝒆𝒔 𝒂𝒗𝒆𝒄 𝒔𝒖𝒄𝒄𝒆𝒔 𝒂𝒖 𝒈𝒓𝒐𝒖𝒑𝒆",
			failedAdd: "- 𝑬𝒄𝒉𝒆𝒄 𝒅𝒆 𝒍'𝒂𝒋𝒐𝒖𝒕𝒆 𝒅𝒆 %1 𝒎𝒆𝒎𝒃𝒓𝒆𝒔 𝒂𝒖 𝒈𝒓𝒐𝒖𝒑𝒆",
			approve: "- %1 𝒎𝒆𝒎𝒃𝒓𝒆𝒔 𝒂𝒋𝒐𝒖𝒕𝒆𝒔 𝒂 𝒍𝒂 𝒍𝒊𝒔𝒕𝒆 𝒅'𝒂𝒑𝒑𝒓𝒐𝒃𝒂𝒕𝒊𝒐𝒏",
			invalidLink: "𝒗𝒆𝒊𝒍𝒍𝒆𝒛 𝒆𝒏𝒕𝒓𝒆𝒓 𝒖𝒏 𝒍𝒊𝒆𝒏 𝒇𝒂𝒄𝒆𝒃𝒐𝒐𝒌 𝒗𝒂𝒍𝒊𝒅𝒆",
			cannotGetUid: "𝒊𝒎𝒑𝒐𝒔𝒔𝒊𝒃𝒍𝒆 𝒅'𝒐𝒃𝒕𝒆𝒏𝒊𝒓 𝒍'𝒂𝒊𝒅𝒆 𝒅𝒆 𝒄𝒆𝒕 𝒖𝒕𝒊𝒍𝒊𝒔𝒂𝒕𝒆𝒖𝒓",
			linkNotExist: "𝒄𝒆𝒕𝒕𝒆 𝑼𝑹𝑳 𝒅𝒆 𝒑𝒓𝒐𝒇𝒊𝒍𝒆 𝒏'𝒆𝒙𝒊𝒔𝒕𝒆 𝒑𝒂𝒔",
			cannotAddUser: "𝒍𝒆 𝒃𝒐𝒕 𝒆𝒔𝒕 𝒃𝒍𝒐𝒒𝒖𝒆 𝒐𝒖 𝒄𝒆𝒕 𝒖𝒕𝒊𝒍𝒊𝒔𝒂𝒕𝒆𝒖𝒓 𝒂 𝒆𝒎𝒑𝒆𝒄𝒉𝒆 𝒅𝒆𝒔 𝒊𝒏𝒄𝒐𝒏𝒏𝒖𝒔𝒅𝒆 𝒔'𝒂𝒋𝒐𝒖𝒕𝒆𝒂𝒖 𝒈𝒓𝒐𝒖𝒑𝒆"
		}
	},

	onStart: async function ({ message, api, event, args, threadsData, getLang }) {
		const { members, adminIDs, approvalMode } = await threadsData.get(event.threadID);
		const botID = api.getCurrentUserID();

		const success = [
			{
				type: "success",
				uids: []
			},
			{
				type: "waitApproval",
				uids: []
			}
		];
		const failed = [];

		function checkErrorAndPush(messageError, item) {
			item = item.replace(/(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)/i, '');
			const findType = failed.find(error => error.type == messageError);
			if (findType)
				findType.uids.push(item);
			else
				failed.push({
					type: messageError,
					uids: [item]
				});
		}

		const regExMatchFB = /(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/i;
		for (const item of args) {
			let uid;
			let continueLoop = false;

			if (isNaN(item) && regExMatchFB.test(item)) {
				for (let i = 0; i < 10; i++) {
					try {
						uid = await findUid(item);
						break;
					}
					catch (err) {
						if (err.name == "SlowDown" || err.name == "CannotGetData") {
							await sleep(1000);
							continue;
						}
						else if (i == 9 || (err.name != "SlowDown" && err.name != "CannotGetData")) {
							checkErrorAndPush(
								err.name == "InvalidLink" ? getLang('invalidLink') :
									err.name == "CannotGetData" ? getLang('cannotGetUid') :
										err.name == "LinkNotExist" ? getLang('linkNotExist') :
											err.message,
								item
							);
							continueLoop = true;
							break;
						}
					}
				}
			}
			else if (!isNaN(item))
				uid = item;
			else
				continue;

			if (continueLoop == true)
				continue;

			if (members.some(m => m.userID == uid && m.inGroup)) {
				checkErrorAndPush(getLang("alreadyInGroup"), item);
			}
			else {
				try {
					await api.addUserToGroup(uid, event.threadID);
					if (approvalMode === true && !adminIDs.includes(botID))
						success[1].uids.push(uid);
					else
						success[0].uids.push(uid);
				}
				catch (err) {
					checkErrorAndPush(getLang("cannotAddUser"), item);
				}
			}
		}

		const lengthUserSuccess = success[0].uids.length;
		const lengthUserWaitApproval = success[1].uids.length;
		const lengthUserError = failed.length;

		let msg = "";
		if (lengthUserSuccess)
			msg += `${getLang("successAdd", lengthUserSuccess)}\n`;
		if (lengthUserWaitApproval)
			msg += `${getLang("approve", lengthUserWaitApproval)}\n`;
		if (lengthUserError)
			msg += `${getLang("failedAdd", failed.reduce((a, b) => a + b.uids.length, 0))} ${failed.reduce((a, b) => a += `\n    + ${b.uids.join('\n       ')}: ${b.type}`, "")}`;
		await message.reply(msg);
	}
};
