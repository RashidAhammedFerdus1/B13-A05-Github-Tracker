let issues = [];

async function issuesFetchData() {
    const res = await fetch(
        "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );
    const data = await res.json();
    issues = data.data;

    displayIssues(issues);
}
// display issues

const displayIssues = (issues) => {
    //   console.log(issues);
    const issuesContainer = document.getElementById("container");
    issuesContainer.innerHTML = "";
    issues.forEach((item) => {
        let statusIcons = "";
        let priorityColor = "";
        // console.log(item);

        const issuesAppended = document.createElement("div");

        issuesAppended.className =
            "bg-white p-5 space-y-4 border-t-gray-500 border-t-5 rounded-xl";
        // for open and closed border
        if (item.status === "open") {
            //   console.log(item.status);
            issuesAppended.classList.replace(
                "border-t-gray-500",
                "border-t-green-500",
            );
            statusIcons = "assets/Open-Status.png";
        } else if (item.status === "closed") {
            issuesAppended.classList.replace(
                "border-t-gray-500",
                "border-t-purple-500",
            );
            statusIcons = "assets/Closed- Status .png";
        }

        if (item.priority === "high") {
            priorityColor = "bg-[#FEECEC] text-[#EF4444]";
        } else if (item.priority === "medium") {
            priorityColor = "bg-[#FFF6D1] text-[#F59E0B]";
        } else if (item.priority === "low") {
            priorityColor = "bg-gray-300 text-gray-600";
        } else {
            priorityColor = "bg-gray-300 text-black";
        }

        issuesAppended.innerHTML = `
    <div  class="flex items-center  justify-between space-x-2 ">
            <img src= "${statusIcons}" alt=""> 
            <p onclick="useModal(${item.id})" class="${priorityColor} rounded-3xl px-5 py-1">${item.priority}</p>
        </div>
    <h1 onclick="useModal(${item.id})" class="text-xl font-bold line-clamp-2">${item.title}</h1>
    
                    <p class="text-xl font-semibold text-[#64748B] line-clamp-2">${item.description}</p>
                    <div onclick="useModal(${item.id})" class="flex gap-3">
                        <div class="flex items-center px-2 py-0 bg-[#FECACA] space-x-2 rounded-4xl">
                            <img src="./assets/Vector (2).png" alt="">
                            <p class="text-[#EF4444] line-clamp-1">${item.labels[0] ? item.labels[0] : "NO Added"}</p>
                        </div>
                        <div class="flex items-center space-x-2 bg-[#FDE68A] rounded-3xl px-2 py-0">
                            <img src="./assets/Vector (3).png" alt="">
                            <p class="text-[#D97706] line-clamp-1">${item.labels[1] ? item.labels[1] : "No Added"}</p>
                        </div>
                    </div>
                    <hr class="w-full m-0 p-0 border-gray-300">
                    <div class="text-[#64748B] text-xl">
                        <p>#${item.author}</p>
                        <P><p>${new Date(item.createdAt).toLocaleDateString()}</p></P>
                    </div>
    `;
        issuesContainer.appendChild(issuesAppended);
    });
    // hiddenLoading();
};

const allbtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");
const countIssues = document.getElementById("countIssues");
const loadingScan = document.getElementById("loadingScan");
// showing
function showLoading() {
    loadingScan.classList.add("flex");
    loadingScan.classList.remove("hidden");
}
// hidden
function hiddenLoading() {
    loadingScan.classList.add("hidden");
    loadingScan.classList.remove("flex");
}

let allBtnStatus = "all-btn";
function toggleBtn(id) {
    allBtnStatus = id;
    showLoading();
    // remove color
    allbtn.classList.remove("btn-primary", "text-white");
    openBtn.classList.remove("btn-primary", "text-white");
    closeBtn.classList.remove("btn-primary", "text-white");
    // add color
    allbtn.classList.add("bg-white", "text-black");
    openBtn.classList.add("bg-white", "text-black");
    closeBtn.classList.add("bg-white", "text-black");

    const clickbtn = document.getElementById(id);
    clickbtn.classList.add("bg-blue-500", "text-white");
    clickbtn.classList.remove("bg-white", "text-black");
    // section

    setTimeout(() => {
        if (id === "open-btn") {
            filteredIssues = issues.filter((issue) => issue.status === "open");
            displayIssues(filteredIssues);

            document.getElementById("countIssues").innerText = filteredIssues.length;
        } else if (id === "close-btn") {
            filteredIssues = issues.filter((issue) => issue.status === "closed");
            displayIssues(filteredIssues);
            // hiddenLoading();
            document.getElementById("countIssues").innerText = filteredIssues.length;
        } else if (id === "all-btn") {
            displayIssues(issues);
            document.getElementById("countIssues").innerText = issues.length;
        }
        hiddenLoading();
    }, 300);
}
document.getElementById("search-btn")
    .addEventListener("click", async function () {
        const searchValue = document.getElementById("searchValue");

        const ValueInput = searchValue.value.trim().toLowerCase();
        if (ValueInput === "") {
            alert("Enter Word");
            return;
        }
        console.log(ValueInput);
        const res = await fetch(
            `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${ValueInput}`,
        );
        const data = await res.json();
        let maindata = data.data;

        console.log(data.data);

        if (maindata.length === 0) {
            alert("Sorry !! No word found");
            return;
        }
        document.getElementById("countIssues").innerText = maindata.length;
        displayIssues(maindata);
        searchValue.value = "";
    });