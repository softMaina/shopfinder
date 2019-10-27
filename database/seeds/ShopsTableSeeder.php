<?php

use App\Shop;
use Illuminate\Database\Seeder;

class ShopsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        //$subscriber->roles()->attach($role_subscriber);
        $faker = \Faker\Factory::create();
        // And now let's generate a few orders :
        for ($i = 0; $i < 10; $i++) {
            $shop = Shop::create([
                'name' => 'Shop ' . ($i + 1),
                'description' => $faker->text,
                'location' => $faker->city,
                'size' => (($i + 1) * 10) . 'X' . (($i + 1) * 10),
                'price' => ($i + 1) * (($i + 1) % 2),
            ]);
        }
    }
}
