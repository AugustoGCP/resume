
export async function post(path, data){

    var url = window.location.href
    $("#spinner").show()

    $.ajax({
        url: url + path,
        method: "POST",
        data: data,
        processData: false, // Se data for um objeto FormData
        contentType: false, // Se data for um objeto FormData
        success: function(result) {
            // Faça algo com os dados recebidos
            console.log(result);
            $("#spinner").hide();
            $(".toast-body.success").empty();
            $(".toast-body.success").text(result.msg); // Define o texto do toast
            $("#toast-success").toast('show'); // Exibe o toast
        },
        error: function(xhr, status, error) {
            console.log(error);
            $("#spinner").hide();
            $(".accordion-body.error").empty();
            $(".accordion-body.error").text(error); // Define o texto do toast
            $("#toast-danger").toast('show'); // Exibe o toast
            // throw error;
        }
    });
}