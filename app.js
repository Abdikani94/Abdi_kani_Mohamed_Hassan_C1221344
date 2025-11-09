const {MongoClient} =require('mongodb');

const client = new MongoClient('mongodb://localhost:27017');

// client.connect().then(()=>{
//     console.log('Connected to MongoDB');
// }).catch((err)=>{
//     console.error('Connection failed', err);}).finally(()=>{
//     client.close();
//     console.log('Connection closed');
//     })

async function run(){
    try{
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('Testing');
        const students = db.collection('students');
        //Inserting multiple students
//         const result =await students.insertMany([{
//             name:"Sacdiya", age:20, department:"Nursing", year:3
//         },{
//             name:"Ahmed", age:22, department:"Engineering", year:4
//         }, 
//     {
//         name:"Farhiya", age:19, department:"Arts", year:2
//     }, {
//         name:"Hassan", age:21, department:"Science", year:3
//     },
//     {
//         name:"Amina", age:23, department:"Business", year:4
//     },
// {
//         name:"Yusuf", age:20, department:"Law", year:2
// },
// {
//         name:"Layla", age:22, department:"Medicine", year:4
// },
// {
//         name:"Omar", age:21, department:"Architecture", year:3
// },
// {
//         name:"Geedi", age:19, department:"Education", year:2
// }]);
//         console.log(`${result.insertedCount} documents were inserted`);

    





//         //Inserting only one student
        const halsoogeli= await students.insertOne({
            name:"jimcale", age:24, department:"Photography", year:4
        });
        console.log(`Document inserted with _id: ${halsoogeli.insertedId}`);

  


//         //Finding all students
        const findall =await students.find().toArray();
        console.log('Students:', findall);

        


//          //Finding students name and their departments only
        const projection =await students.find({}, { projection: {name:1, department:1, _id:0}}).toArray();
        console.log('Students Names and Years:', projection);
         

//          //Finding only fourth year students
        const onlyyear =await students.find({year:4}).toArray();
        console.log('Fourth Year Students:', onlyyear);
        

        //update one student
        const updateone = await students.updateOne({name:"Ahmed"}, {$set:{name:" Abuukar", age:30}});
        console.log(`Matched ${updateone.matchedCount} and Modified ${updateone.modifiedCount} document(s)`);

        //update many students
        const updatemany =await students.updateMany({year:2}, {$set:{department:"Social Sciences"}});
        console.log(`Matched ${updatemany.matchedCount} and Modified ${updatemany.modifiedCount} document(s)`);

        //delete one student
        const deleteone =await students.deleteOne({name:"Sacdiya"});
        console.log(`Deleted ${deleteone.deletedCount} document(s)`);

        //delete many students
        const deletemany = await students.deleteMany({department:"Engineering"});
        console.log(`Deleted ${deletemany.deletedCount} document(s)`);

        //Counting students in the collection
        const count = await students.countDocuments();
        console.log(`Total number of students: ${count}`);

        //limiting results to 3 students
        const limitresults = await students.find().limit(3).toArray();
        console.log('Limited Results (3 students):', limitresults);

        //Sorting students by age in ascending order
        const sortresults = await students.find().sort({name:1}).toArray();
        console.log('Students sorted by age (ascending):', sortresults);

        //Skipping first 2 students
        const skipresults = await students.find().skip(2).toArray();
        console.log('Students after skipping first 2:', skipresults);

        //Combining multiple query options: find students in year 3, limit to 2 results, sort by name descending
        const combinedresults = await students.find({year:3}).limit(2).sort({name:-1}).toArray();
        console.log('Combined Query Results:', combinedresults);

        //descending order
        const descresults = await students.find().sort({name:-1}).toArray();
        console.log('Students sorted by name (descending):', descresults);

}catch(err){
        console.error('Connection failed', err);
    }finally{
        await client.close();
        console.log('Connection closed');
    }
}
run();