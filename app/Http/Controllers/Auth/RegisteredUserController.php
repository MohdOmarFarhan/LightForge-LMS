<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'institution' => 'required|string|max:255',
            'class' => 'required|string|max:255',
            'group' => 'required|string|max:255',
            'hsc_year' => 'required|string|max:4',
            'contact_no' => 'required|string|max:20',
            'whatsapp_no' => 'required|string|max:20',
            'guardian_no' => 'required|string|max:20',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'institution' => $request->institution,
            'class' => $request->class,
            'group' => $request->group,
            'hsc_year' => $request->hsc_year,
            'contact_no' => $request->contact_no,
            'whatsapp_no' => $request->whatsapp_no,
            'guardian_no' => $request->guardian_no,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'student',
            'is_approved' => false,
        ]);

        event(new Registered($user));

        // Do not auto-login
        // Auth::login($user);

        return redirect(route('waiting-lobby'));
    }
}
