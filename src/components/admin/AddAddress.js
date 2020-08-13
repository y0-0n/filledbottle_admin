
export function sample6_execDaumPostcode() {
  new window.daum.Postcode({
    oncomplete: function (data) {
      var addr = ''; // 주소 변수
      var extraAddr = ''; // 참고항목 변수
      if (data.userSelectedType === 'R') {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }
      if (data.userSelectedType === 'R') {
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
        //document.getElementById("sample6_extraAddress").value = extraAddr;
        addr += extraAddr;
      } else {
        //document.getElementById("sample6_extraAddress").value = '';
      }
      document.getElementById('sample6_postcode').value = data.zonecode;
      document.getElementById("sample6_address").value = addr;
      document.getElementById("sample6_detailAddress").focus();
    }
  }).open();
}
