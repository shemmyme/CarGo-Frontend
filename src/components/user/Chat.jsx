import React from "react";
import { ToastContainer, toast } from "react-toastify";

export default function ChatSection() {
  return (
    <div className='flex overflow-hidden flex-col w-full'>
    {/* <RecentChats allChat={allChat} selectedChat={selectedChat} handleProvider={handleProvider} role={'user'} /> */}
    <div>
        <div className="flex h-screen antialiased text-gray-800 w-full ">
            <div className="flex flex-row h-full w-full overflow-x-hidden">
                <div className="flex flex-col flex-auto mt-1 sm:p-6 w-full">
                    <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                        <div className="flex flex-col h-full overflow-x-auto scrollbar-hide mb-4">
                            <div className="flex flex-col h-full">
                                <div key="sample-message" className="grid grid-cols-12 gap-y-2">
                                    <div className="col-start-7 col-end-13 p-3 rounded-lg">
                                        <div className="flex items-center justify-start flex-row-reverse mt-1">
                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                <img
                                                    src="https://res.cloudinary.com/dq0tq9rf5/image/upload/v1688557091/tpqthkuzphqpykfyre7i.jpg"
                                                    alt="Avatar"
                                                    className="h-full w-full rounded-full"
                                                />
                                            </div>
                                            <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                                <div>Sample Message Content</div>
                                                <small className="text-xs text-gray-400">Sample Time</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div key="sample-message" className="col-start-1 col-end-7 p-3 rounded-lg">
                                        <div className="flex flex-row items-center">
                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                <img
                                                    src="https://res.cloudinary.com/dq0tq9rf5/image/upload/v1688557091/tpqthkuzphqpykfyre7i.jpg"
                                                    alt="Avatar"
                                                    className="h-full w-full rounded-full"
                                                />
                                            </div>
                                            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                <div>Sample Message Content</div>
                                                <small>Sample Time</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form >
                            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                                <div className="flex-grow ml-4">
                                    <div className="relative w-full">
                                        <input
                                            type="text"
                                            className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                            placeholder="Type your message..."
                                            // value={newMessage}
                                            // onChange={handleNewMessage}
                                        />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <button
                                        type="submit"
                                        className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                                    >
                                        <span>Send</span>
                                        <span className="ml-2"></span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}