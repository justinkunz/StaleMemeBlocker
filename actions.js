const _addWarning = a => {
  const blockMsg = document.createElement("span");
  blockMsg.classList.add("rickroll__blocked");
  blockMsg.innerHTML = "(Rick Roll Link Detected)";
  a.parentNode.insertBefore(blockMsg, a.nextSibling);
};

const _checkYTLink = link => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `https://cors-anywhere.herokuapp.com/${link.href}`, true);
  xhr.setRequestHeader("X-Requested-With", null);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      const { responseText } = xhr;
      if (responseText.toLowerCase().includes("never gonna give you up")) {
        _addWarning(link);
      }
    }
  };
  xhr.send();
};

const _checkPage = () => {
  const yt = Array.from(document.getElementsByTagName("a")).filter(
    url => url.href.includes("youtube") || url.href.includes("youtu.be")
  );

  for (link of yt) {
    _checkYTLink(link);
  }
};

_checkPage();
