$(document).ready(function() {
    var from, to, subject, text;
    $("#big_submit_button").click(function() {
        console.log("the big_submit_button was pressed")
        to = $("#email").val();
        subject = "your image is ready"; // $("subject").val();
        text = "here is the image"; // $("here is the image").val();
        $("#message").text("Sending E-mail...Please wait");
        $.get("http://localhost:3000/send", {
            to: to,
            subject: subject,
            text: text
        }, function(data) {
            if (data == "sent") {
                $("#message").empty().html("Email is been sent at " + to + " . Please check inbox !");
            }

        });
    });
});