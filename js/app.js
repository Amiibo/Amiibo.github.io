var selected_amiibos = [];
$(document).ready(function () {
    if (typeof (Storage) !== "undefined") {
        //Get the list of amiibos:
        var url = "../amiibo_data.json";
        $.ajax({
            dataType: "json",
            url: url,
            success: function (data) {
                loadAmiibos(data);
                setSelectsAmiibos();
            }
        });
    }
    else {
        $("#no_support").css("display", "block");
    }
});
$('#amiibo_list').on('click', '.amiibo', function () {
    var id_amiibo = $(this).attr("data-id");
    setSelect(id_amiibo, false);
});
//functions
function loadAmiibos(amiibo) {
    for (var i = 0; i < amiibo.length; i++) {
        var description = "<div class=\"amiibo-desc\"><h2>" + amiibo[i].name + "</h2>";
        description = description + "<span class=\"game\">" + amiibo[i].game + "</span>";
        description = description + "<span class=\"date\">" + amiibo[i].releasedate + "</span></div>";
        var image = "<img src=\"images/amiibo/" + amiibo[i].picture + "\" alt=\"" + amiibo[i].name + "\" />";
        var complete = "<div class=\"complete\" style=\"display:none\" id=\"complete_" + amiibo[i].id + "\"></div>";
        var div = "<li class=\"amiibo\" data-select=\"false\" data-id=\"" + amiibo[i].id + "\" id=\"amiibo_" + amiibo[i].id + "\" title=\"" + amiibo[i].name + "\">" + description + image + complete + "</li>";
        $("#amiibo_list").append(div);
    }
}
function setSelect(i, reset) {
    var li_amiibo = $("#amiibo_" + i);
    if (li_amiibo.attr("data-select") == "false") {
        li_amiibo.attr("data-select", "true");
        $("#complete_" + i).css("display", "block");
        if (!reset) {
            selected_amiibos.push(i);
        }
    }
    else {
        li_amiibo.attr("data-select", "false");
        $("#complete_" + i).css("display", "none");
        if (!reset) {
            var index = selected_amiibos.indexOf(i);
            if (index > -1) {
                selected_amiibos.splice(index, 1);
            }
        }
    } if (!reset) {
        localStorage.setItem("amiibos", JSON.stringify(selected_amiibos));
    }
}
function setSelectsAmiibos() {

    selected_amiibos = JSON.parse(localStorage.getItem("amiibos"));

    if (selected_amiibos != null || selected_amiibos instanceof Array) {
        for (var i = 0; i < selected_amiibos.length; i++) {
            setSelect(selected_amiibos[i], true);
        }
    }
    else {
        selected_amiibos = [];
    }
}
function clearStorage() { localStorage.clear(); }