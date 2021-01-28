function mapAlzaBoxes() {
    if (0 < $("#or-map-ab").length) {
        var t = isMobile() ? void 0 !== Alza.Mobile && void 0 !== Alza.AjaxPage ? Alza.Mobile.Page.data().countryCode.toLowerCase() : Alza.Web.Page.pageData().countryCode.toLowerCase() : Alza.Web.Page.Data.countryCode.toLowerCase(),
            e = 49.83575885681151,
            i = 15.449006959374998,
            s = 7;
        switch ("sk" == t ? (e = 48.6524083250488, i = 19.733674958749987, s = 6) : "hu" == t && (e = 47.11639186182895, i = 19.519441529687498, s = 7), parseInt($("#or-map-ab").data("type"))) {
            case 2:
                type = Alza.Web.Eshop.Enums.PickupPlaceType.AlzaBox;
                break;
            case 8:
                type = Alza.Web.Eshop.Enums.PickupPlaceType.Zasikovna;
                break;
            case 16:
                type = Alza.Web.Eshop.Enums.PickupPlaceType.GeisPoint;
                break;
            default:
                type = Alza.Web.Eshop.Enums.PickupPlaceType.None
        }
        var r = {
            mapContainerId: "or-map-ab",
            center: {
                latitude: e,
                longitude: i
            },
            callback: function () {
                var r = [];
                r.push({
                    latitude: e,
                    longitude: i
                }), articleMap.CenterZoom(r, s), $.ajax({
                    type: "POST",
                    url: window.location.protocol + "//" + window.location.host + "//Services/EShopService.svc/GetAlzaPlacesResult",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: {},
                    async: !0,
                    headers: {},
                    global: !0,
                    success: function (t) {
                        var e = function (t) {
                            var e = [];
                            if (void 0 !== t)
                                for (var r = 0, i = t.length; r < i; r++) {
                                    var s = t[r],
                                        a = {
                                            id: s.id,
                                            label: s.name,
                                            icon: type ? "/Styles/images/svg/delivery/icon-" + type + "-map.svg" : Alza.Web.Controls.Maps.Seznam.Icons.Branch,
                                            iconSelected: type ? "/Styles/images/svg/delivery/icon-" + type + "-map-active.svg" : Alza.Web.Controls.Maps.Seznam.Icons.Selected,
                                            type: Alza.Web.Controls.Maps.Seznam.MarkerType.Default,
                                            position: {
                                                latitude: s.latitude,
                                                longitude: s.longitude
                                            },
                                            onClick: function (r) {
                                                return function (t) {
                                                    return n = t, e = {
                                                        url: (a = r).detailsApiUrl,
                                                        onSuccess: function (t) {
                                                            var e;
                                                            e = t, a.details = {
                                                                url: e.detailAction.href
                                                            };
                                                            var r, i, s = (r = a, (i = new SMap.Card).getBody().innerHTML = function (t) {
                                                                var e = Alza.Shared.Utils.Text.GetText("PriceSlasher_Detail", "Detail"),
                                                                    r = "";
                                                                return t.imageUrl && (r += '<img src="' + t.imageUrl + '" class="place-img">'), r += '\n\t\t\t\t<h3 class="place-title">' + t.name + '</h3>\n\t\t\t\t<p class="place-adr">' + t.text + '</p>\n\t\t\t\t<div class="place-hours"></div>\n\t\t\t\t<a class="or-btn or-btn--sport or-btn--normal" href="' + t.details.url + '" title="' + e + '"><span class="or-btn__inner"><span class="or-btn__inner-text">' + e + "</span></span></a>"
                                                            }(r), i);
                                                            n.getMap().addCard(s, n.getCoords(), !0)
                                                        }
                                                    }, void Alza.Shared.Utils.Ajax.callAjax(e);
                                                    var a, n, e
                                                }
                                            }(s)
                                        };
                                    e.push(a)
                                }
                            return e
                        }(t.d.alzaBoxes);
                        articleMap.setMarkers(e), articleMap.CenterZoom(r, 7)
                    },
                    error: function (t, e, r) {},
                    xhrFields: {
                        withCredentials: !0
                    }
                })
            },
            useClusterer: !0,
            disableMouseWheelScroll: !0
        };
        articleMap = new Alza.Web.Controls.Maps.Seznam.Maps(r), articleMap.InitMaps()
    }
}

$( document ).ready(function() {
	mapAlzaBoxes();
});