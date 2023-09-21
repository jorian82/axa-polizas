const timeline_icons = ['videoconsulta','consulta','enfermeria','nutricion','siniestro','consulta','videoconsulta','psicologia','videoconsulta'];
const timeline_dates = ['12/28/2022','06/09/2023','08/25/2023','08/30/2023','10/05/2023','10/10/2023','11/27/2023','12/05/2023','11/27/2023'];
const timeline_labels = ['Video Consulta','Consulta','Enfermería','Nutrición','Siniestro 21010151158', 'Consulta Próxima','Video Consulta', 'Psicología','Video Consulta'];

$(document).ready(()=>{
    addMenuYears(10);

    $('.nav-angle-down').click(function(){
        $('.sub-section').hide();
    })
    $('.nav-historial').click(()=>{
        $('#historial').toggle();
        $('#detalles').hide();
        $('#guia').hide();
        $('#client-name').hide();
        $('#timeline-details-section').hide();
        $('#timeline').hide();
    });
    $('.nav-detalles').click(()=>{
        $('#historial').hide();
        $('#detalles').toggle();
        $('#guia').hide();
    });
    $('.nav-guia').click(()=>{
        $('#historial').hide();
        $('#detalles').hide();
        $('#guia').toggle();
    });
});

function addMenuYears(num) {
    let i=0;
    let fecha = new Date();

    while(i<num) {
        let year = $('<button type="button" class="btn btn-outline-primary rounded-button"></button>');
        let temp = fecha.getUTCFullYear()-i;
        year.append(temp);
        year.click(()=> {
            let timelineBase = $('<div class="timeline-base"></div>');
            $('#timeline').html('').append(timelineBase).show();
            $('#client-name').hide();
            $('#timeline-details-section').hide();
            addIcons(temp);
        })
        $('#menu-year').append(year);
        i++;
    }
}

function showDetails(value, fecha) {
    $('#client-name').show();
    $('#timeline-details-section').show();
    let date_elem = $("<div class='detail-date-title'></div>");
    let date_label = $("<div class='detail-date-date'></div>");
    let date_day = $("<div class='detail-date-day'></div>");
    let date_hour = $("<div class='detail-date-hour'></div>");
    let curr = new Date(fecha);
    date_label.append(curr.getDate()+'/'+(curr.getMonth()+1)+'/'+curr.getUTCFullYear());
    date_day.append(getWeekDay(curr.getDay()));
    date_hour.append(curr.getHours()+':'+curr.getMinutes());


    let detail_label = $("<div class='detail-label'></div>");
    let detail_sublabel = $("<div class='detail-sublevel'></div>")
    let label = value.split(' ');
    detail_label.append(label[0]);
    date_elem.append(label[0]);
    if(label.length>1){
        if(label[0]==='Siniestro'){
            detail_sublabel.append('Numero: '+label[1]);
        } else {
            date_elem.append(' '+label[1]);
            detail_sublabel.append(label[1]);
        }
    }
    $('.timeline-detail-date').html('').append(date_elem).append(date_label).append(date_day).append(date_hour).show();
    $('.timeline-detail-main').html('').append(detail_label).append(detail_sublabel).show();
}

function getWeekDay(num = 0) {
    return num===0?'Sunday':num===1?'Monday':num===2?'Tuesday':num===3?'Wednesday':num===4?'Thursday':num===5?'Friday':num===6?'Saturday':'N/A';
}

function addIcons (year)
{
    let idx = 0;
    let count = 0;
    let itemPos = 0;
    timeline_icons.forEach(item => {
        itemPos = 90+count*110;
        let elem = $("<div class='timeline-icon' style='left:"+itemPos+"px'></div>");
        let bg = $("<img src='icons/circle.svg' width='60px' class='timeline-icon1'/>");
        let icon = $("<img src='icons/"+item+".svg' width='35px' height='35px' class='timeline-icon2'/>");
        itemPos = (idx%2)?126:52;
        let indicator = $("<img src='icons/icon_indicator.svg' height='14px' class='timeline-icon3' style='top: "+itemPos+"px'/>");
        itemPos = (idx%2)?160:0;
        let title = $("<span class='timeline-title' style='top:"+itemPos+"px'></span>");
        let date = $("<span class='timeline-date' style='top: "+(itemPos+35)+"px'></span>");
        let curr = new Date(timeline_dates[idx]);
        let etiqueta =  timeline_labels[idx]
        let fecha = timeline_dates[idx];
        title.append(etiqueta);
        date.append(curr.getDate()+'/'+(curr.getMonth()+1)+'/'+curr.getUTCFullYear());
        elem.append(bg);
        elem.append(icon);
        elem.append(indicator);
        elem.append(title);
        elem.append(date);

        elem.click(()=>{
            showDetails(etiqueta,fecha);
        })
        if(curr.getUTCFullYear()===year) {
            $('#timeline').append(elem);
            count++
        }
        idx++;
    });

    if(count<1){
        let empty = $('<div style="position: absolute; top: 120px; width: 100%; text-align: center; font-size: 30px"></div>');
        empty.append("No se encontraron eventos para el periodo seleccionado");
        $('#timeline').html('').append(empty);
    } else {
        let nav_left = $("<img src='icons/nav_left.svg' class='timeline-nav' style='left: 14px' />");
        let nav_right = $("<img src='icons/nav_right.svg' class='timeline-nav' style='left: 1162px' />");
        $('#timeline').append(nav_left).append(nav_right);
    }
}