export class readFileOrUrl{
    public static read(file: any){
      var reader = new FileReader();
         reader.onload=function(e){
           var data = reader.result;
           alert("readed size"+data.byteLength);
         }
         reader.onerror = function(e){

         }
         reader.readAsArrayBuffer(file);
    }
}
