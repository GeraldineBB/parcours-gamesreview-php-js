<?php

namespace App\Http\Controllers;

use App\Models\Videogame;
use Illuminate\Http\Request;

class VideogameController extends Controller
{
    /**
     * /videogames/[id]
     * GET
     */
    public function read($id)
    {
        // Get item or send 404 response if not
        $item = Videogame::find($id);

        // Si on a un résultat
        if (!empty($item)) {
            // Return JSON of this list
            return $this->sendJsonResponse($item, 200);
        }
        // Sinon
        else {
            // HTTP status code 404 Not Found
            return $this->sendEmptyResponse(404);
        }
    }

    /**
     * /videogames/[id]/reviews
     * GET
     */
    public function getReviews($id)
    {
        // Get item or send 404 response if not
        $item = Videogame::find($id);

        // Si on a un résultat
        if (!empty($item)) {
            // Retrieve all related Reviews (thanks to Relationships)
            // $reviews = $item->reviews->load(['videogame', 'platform']);
            // But, relationships with videogame & plaftorm are not configured yet
            $reviews = $item->reviews;

            // Return JSON of this list
            return $this->sendJsonResponse($reviews, 200);
        }
        // Sinon
        else {
            // HTTP status code 404 Not Found
            return $this->sendEmptyResponse(404);
        }
    }

    /**
     * /videogames
     * GET
     */
    public function list()
    {
        // Get all items
        $list = Videogame::all();

        // Return JSON of this list
        return $this->sendJsonResponse($list, 200);
    }

    /**
     * /videogames
     * POST
     */
    public function create(Request $request)
    {

    // on vérifie l'existence d'un titre, d'un édtieur dans les données transmises par le front
    if ($request->filled(['name', 'editor'])) {

        // on récupère les données envoyées en POST
        $name = $request->input('name');
        $editor = $request->input('editor');

        // on instancie un nouveau jeu video
        $newVideogame = new Videogame();

        // on modifie les propriétés en BDD avec les données qu'on reçoit du front
        $newVideogame->name=$name;
        $newVideogame->editor=$editor;

        // on insert ces données en BDD : on nous renverra true si c'est bien inséré
        $results = $newVideogame->save();

        // on vérifie que l'insertion s'est bien passée
        if ($results) {

            return response()->json($newVideogame, 201);

        } else {

            return response()->json('', 500);
        }

    } else {

        return response()->json('', 400);
    }


    }
}
