import { MongoConnect } from "@/lib/Mongoconnect";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import Usermodel from "@/Model/User";

export async function POST(request) {
    try {
        const { Name, Email, Password } = await request.json();
        const hashedPassword = await bcrypt.hash(Password, 10); // Use 10 as the number of salt rounds
        await MongoConnect();

        




        await Usermodel.create({ Name, Email, Password: hashedPassword }); // Store the hashed password in the database

        return NextResponse.json({
            message: 'USER REGISTERED'
        }, {
            status: 201
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
