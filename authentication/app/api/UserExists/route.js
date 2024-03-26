import { MongoConnect } from "@/lib/Mongoconnect";
import { NextResponse } from "next/server";

import Usermodel from "@/Model/User";

export async function POST(request) {
    try {
        const { Email } = await request.json();

        await MongoConnect();
        const user= await Usermodel.findOne({Email}).select("_id"); // Store the hashed password in the database

        return NextResponse.json({
      
            user
        });

    } catch (error) {
        console.log('USER NOT REGISTERED');
        return NextResponse.json({
            message: 'AN ERROR HAS OCCURRED WHILE REGISTERING'
        }, {
            status: 500
        });
    }
}
