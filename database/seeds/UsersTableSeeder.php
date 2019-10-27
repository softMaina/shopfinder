<?php

use App\Role;
use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Let's clear the users table first
        //User::truncate();

        $faker = \Faker\Factory::create();

        // Let's make sure everyone has the same password and 
        // let's hash it before the loop, or else our seeder 
        // will be too slow.
        $password = Hash::make('123'); // change your password here

        $admin = User::create([
            'firstname' => 'Molly',
            'lastname' => 'Wangui',
            'email' => 'molly@mail.com',
            'password' => $password,
            'phone_number' => '0705571314',
        ]);
        $admin->assignRole('admin');

        $agent = User::create([
            'firstname' => 'Landlord',
            'lastname' => 'Doe',
            'email' => 'landlord@mail.com',
            'password' => Hash::make('123456'),
            'phone_number' => '0712123456',
        ]);
        $agent->assignRole('Landlord');

        $user = User::create([
            'firstname' => 'User',
            'lastname' => 'Doe',
            'email' => 'user@mail.com',
            'password' => Hash::make('123456'),
            'phone_number' => '0712345678',
        ]);
        $user->assignRole('tenant');

        // And now let's generate a few dozen users for our app:
        /*for ($i = 0; $i < 10; $i++) {
            User::create([
                'name' => $faker->name,
                'email' => $faker->email,
                'password' => $password,
            ]);
        }*/
    }
}
