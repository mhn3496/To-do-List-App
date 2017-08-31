var StatusENUMS = {
    ACTIVE  : "ACTIVE",
    COMPLETE : "COMPLETE",
    DELETED : "DELETED"
}

var todos = {
    1: {title: "Learn Javascript", status  : StatusENUMS.ACTIVE},
    2 :{title: "Git Tutorial", status  : StatusENUMS.ACTIVE},
    3: {title: "Interactive Git", status  : StatusENUMS.COMPLETE},
    4: {title: "CSS Introduction", status  : StatusENUMS.ACTIVE},
    5: {title: "First Assignment", status  : StatusENUMS.ACTIVE},
    6: {title: "2nd Assignment", status  : StatusENUMS.ACTIVE},
    7: {title: "Learn git commands", status  : StatusENUMS.COMPLETE},
    8: {title: "Upload assignments on git", status  : StatusENUMS.DELETED}
}

var next_todo_id = 9;

module.exports = {
    StatusENUMS : StatusENUMS,
    todos : todos,
    next_todo_id : next_todo_id
}