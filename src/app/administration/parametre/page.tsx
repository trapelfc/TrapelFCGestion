
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  REFERENCE_YEAR_STORAGE_KEY,
  getActiveReferenceYear,
  setActiveReferenceYear,
  getSeasonLabel
} from '@/config/licencies-constants';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  getClubPresidentName,
  setClubPresidentName,
  getClubAddress,
  setClubAddress,
  getClubSiret,
  setClubSiret,
  getClubEmail,
  setClubEmail,
  getClubFffAffiliation,
  setClubFffAffiliation,
} from '@/lib/clubUtils';


export default function ParametrePage() {
  const [referenceYearInput, setReferenceYearInput] = useState<string>('');
  const [currentSavedYear, setCurrentSavedYear] = useState<number>(getActiveReferenceYear());
  const [currentSeasonLabel, setCurrentSeasonLabel] = useState<string>('');

  const [presidentNameInput, setPresidentNameInput] = useState<string>('');
  const [currentSavedPresidentName, setCurrentSavedPresidentName] = useState<string>('');

  const [clubAddressInput, setClubAddressInput] = useState<string>('');
  const [currentSavedClubAddress, setCurrentSavedClubAddress] = useState<string>('');
  const [clubSiretInput, setClubSiretInput] = useState<string>('');
  const [currentSavedClubSiret, setCurrentSavedClubSiret] = useState<string>('');
  const [clubEmailInput, setClubEmailInput] = useState<string>('');
  const [currentSavedClubEmail, setCurrentSavedClubEmail] = useState<string>('');
  const [clubFffAffiliationInput, setClubFffAffiliationInput] = useState<string>('');
  const [currentSavedClubFffAffiliation, setCurrentSavedClubFffAffiliation] = useState<string>('');

  const { toast } = useToast();

  useEffect(() => {
    const activeYear = getActiveReferenceYear();
    setCurrentSavedYear(activeYear);
    setReferenceYearInput(activeYear.toString());
    setCurrentSeasonLabel(getSeasonLabel(activeYear));

    const presidentName = getClubPresidentName();
    setCurrentSavedPresidentName(presidentName);
    setPresidentNameInput(presidentName);

    const address = getClubAddress();
    setCurrentSavedClubAddress(address);
    setClubAddressInput(address);

    const siret = getClubSiret();
    setCurrentSavedClubSiret(siret);
    setClubSiretInput(siret);

    const email = getClubEmail();
    setCurrentSavedClubEmail(email);
    setClubEmailInput(email);

    const fffAffiliation = getClubFffAffiliation();
    setCurrentSavedClubFffAffiliation(fffAffiliation);
    setClubFffAffiliationInput(fffAffiliation);

  }, []);

  const handleSaveReferenceYear = () => {
    const year = parseInt(referenceYearInput, 10);
    if (isNaN(year) || year < 2000 || year > 2100) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une année valide (entre 2000 et 2100).",
        variant: "destructive",
      });
      return;
    }
    setActiveReferenceYear(year);
    setCurrentSavedYear(year);
    setCurrentSeasonLabel(getSeasonLabel(year));
    toast({
      title: "Succès",
      description: `L'année de référence a été mise à jour à ${year} (${getSeasonLabel(year)}).`,
    });
  };

  const createSaveHandler = (
    inputState: string,
    setterFn: (value: string) => void,
    currentSavedSetterFn: (value: string) => void,
    fieldName: string,
    allowEmpty: boolean = false
  ) => {
    return () => {
      const trimmedValue = inputState.trim();
      if (!allowEmpty && !trimmedValue) {
        toast({ title: "Erreur", description: `Le champ "${fieldName}" ne peut pas être vide.`, variant: "destructive" });
        return;
      }
      setterFn(trimmedValue);
      currentSavedSetterFn(trimmedValue);
      toast({ title: "Succès", description: `${fieldName} mis à jour.` });
    };
  };

  const handleSavePresidentName = createSaveHandler(presidentNameInput, setClubPresidentName, setCurrentSavedPresidentName, "Nom du Président");
  const handleSaveClubAddress = createSaveHandler(clubAddressInput, setClubAddress, setCurrentSavedClubAddress, "Adresse du club");
  const handleSaveClubSiret = createSaveHandler(clubSiretInput, setClubSiret, setCurrentSavedClubSiret, "Numéro Siret", true);
  const handleSaveClubEmail = createSaveHandler(clubEmailInput, setClubEmail, setCurrentSavedClubEmail, "Mail du club", true);
  const handleSaveClubFffAffiliation = createSaveHandler(clubFffAffiliationInput, setClubFffAffiliation, setCurrentSavedClubFffAffiliation, "Numéro affiliation FFF", true);


  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center">
        <Button variant="outline" size="icon" asChild className="mr-4">
          <Link href="/administration">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Retour au Module Administration</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Paramètres de l'Application</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Paramètres Généraux</CardTitle>
            <CardDescription>Configuration de base de l'application.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-md font-semibold">Année de Référence pour les Catégories</h3>
              <p className="text-xs text-muted-foreground mb-2">
                Utilisée pour calculer l'âge des licenciés. Typiquement l'année civile où la saison en cours se termine.
              </p>
              <Label htmlFor="referenceYear">Année de référence (ex: 2026 pour la {getSeasonLabel(2026)})</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input
                  id="referenceYear"
                  type="number"
                  value={referenceYearInput}
                  onChange={(e) => setReferenceYearInput(e.target.value)}
                  placeholder={`Ex: ${new Date().getFullYear() + 1}`}
                  className="max-w-[150px]"
                />
                <Button onClick={handleSaveReferenceYear} size="sm">Enregistrer</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Actuelle : <span className="font-medium">{currentSavedYear} ({currentSeasonLabel})</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:row-span-2">
          <CardHeader>
            <CardTitle>Informations du Club</CardTitle>
            <CardDescription>Détails spécifiques au club. Utilisés dans les documents officiels.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="presidentName">Président(e) (Nom Prénom)</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input
                  id="presidentName"
                  type="text"
                  value={presidentNameInput}
                  onChange={(e) => setPresidentNameInput(e.target.value)}
                  placeholder="Nom Prénom du Président(e)"
                  className="flex-grow"
                />
                <Button onClick={handleSavePresidentName} size="sm">Enregistrer</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Actuel : <span className="font-medium">{currentSavedPresidentName || "Non défini"}</span>
              </p>
            </div>
            
            <div>
              <Label htmlFor="clubAddress">Adresse du Siège Social</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input
                  id="clubAddress"
                  type="text"
                  value={clubAddressInput}
                  onChange={(e) => setClubAddressInput(e.target.value)}
                  placeholder="Ex: 1 rue de la Mairie, 11000 Ville"
                  className="flex-grow"
                />
                <Button onClick={handleSaveClubAddress} size="sm">Enregistrer</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Actuelle : <span className="font-medium">{currentSavedClubAddress || "Non définie"}</span>
              </p>
            </div>

            <div>
              <Label htmlFor="clubSiret">Numéro SIRET</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input
                  id="clubSiret"
                  type="text"
                  value={clubSiretInput}
                  onChange={(e) => setClubSiretInput(e.target.value)}
                  placeholder="14 chiffres ou 'NON APPLICABLE'"
                  className="flex-grow"
                />
                <Button onClick={handleSaveClubSiret} size="sm">Enregistrer</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Actuel : <span className="font-medium">{currentSavedClubSiret || "Non défini"}</span>
              </p>
            </div>

            <div>
              <Label htmlFor="clubEmail">Mail du Club</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input
                  id="clubEmail"
                  type="email"
                  value={clubEmailInput}
                  onChange={(e) => setClubEmailInput(e.target.value)}
                  placeholder="contact@monclub.fr"
                  className="flex-grow"
                />
                <Button onClick={handleSaveClubEmail} size="sm">Enregistrer</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Actuel : <span className="font-medium">{currentSavedClubEmail || "Non défini"}</span>
              </p>
            </div>

            <div>
              <Label htmlFor="clubFffAffiliation">Numéro d'Affiliation FFF</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input
                  id="clubFffAffiliation"
                  type="text"
                  value={clubFffAffiliationInput}
                  onChange={(e) => setClubFffAffiliationInput(e.target.value)}
                  placeholder="Ex: 5XXXXX"
                  className="flex-grow"
                />
                <Button onClick={handleSaveClubFffAffiliation} size="sm">Enregistrer</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Actuel : <span className="font-medium">{currentSavedClubFffAffiliation || "Non défini"}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Autres Paramètres</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              D'autres paramètres (montants des réductions, etc.) pourront être configurés ici à l'avenir.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
