function mapsSelector() {
  if (
    /* if we're on iOS, open in Apple Maps */
    navigator.platform.indexOf("iPhone") != -1 ||
    navigator.platform.indexOf("iPod") != -1 ||
    navigator.platform.indexOf("iPad") != -1
  )
    window.open(
      "maps://maps.google.com/maps?daddr=" + lat + "," + lng + "&amp;ll="
    );
  /* else use Google */ else
    window.open(
      "maps://maps.google.com/maps?daddr=" + lat + "," + lng + "&amp;ll="
    );
}
