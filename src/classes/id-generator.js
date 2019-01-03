

export default class IdGenerator {
    static getId () {
        if(!IdGenerator.usedIds) { IdGenerator.usedIds = []; }


        let newId = Math.floor(Math.random() * 999999);
        if(IdGenerator.usedIds.indexOf(newId) < 0){
            IdGenerator.usedIds.push(newId);

            return newId;
        }

        return IdGenerator.getId();
    }
}